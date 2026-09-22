import asyncio
import contextlib

import websockets
from bleak import BleakClient, BleakScanner
from websockets.exceptions import ConnectionClosed

HR_UUID = "00002a37-0000-1000-8000-00805f9b34fb"
RETRY_DELAY_SECONDS = 3


def parse_heart_rate(data: bytearray) -> int:
    """Parst das Bluetooth Heart Rate Measurement gemäß GATT-Spezifikation."""
    if len(data) < 2:
        raise ValueError("Unvollständiges Heart-Rate-Paket")

    is_16_bit = bool(data[0] & 0x01)

    if is_16_bit:
        if len(data) < 3:
            raise ValueError("Unvollständiger 16-Bit-Herzfrequenzwert")
        return int.from_bytes(data[1:3], byteorder="little")

    return data[1]


async def find_polar():
    return await BleakScanner.find_device_by_filter(
        lambda device, advertisement_data:
            bool(device.name and "Polar" in device.name),
        timeout=10.0,
    )


async def stream_heart_rate(websocket):
    while True:
        print("Suche Polar-Herzfrequenzsensor …")
        device = await find_polar()

        if device is None:
            print(
                f"Kein Polar-Sensor gefunden. "
                f"Neuer Versuch in {RETRY_DELAY_SECONDS} Sekunden."
            )
            await asyncio.sleep(RETRY_DELAY_SECONDS)
            continue

        queue: asyncio.Queue[int] = asyncio.Queue()
        disconnected = asyncio.Event()
        loop = asyncio.get_running_loop()

        def handle_disconnect(_client):
            loop.call_soon_threadsafe(disconnected.set)

        def handle_heart_rate(_sender, data: bytearray):
            try:
                heart_rate = parse_heart_rate(data)
                loop.call_soon_threadsafe(queue.put_nowait, heart_rate)
            except ValueError as error:
                print(f"Ungültiges Heart-Rate-Paket: {error}")

        try:
            print(f"Verbinde mit {device.name} ({device.address}) …")

            async with BleakClient(
                device,
                disconnected_callback=handle_disconnect,
            ) as client:
                await client.start_notify(HR_UUID, handle_heart_rate)
                print("Herzfrequenzmessung läuft.")

                while not disconnected.is_set():
                    try:
                        heart_rate = await asyncio.wait_for(
                            queue.get(),
                            timeout=1.0,
                        )
                    except asyncio.TimeoutError:
                        continue

                    await websocket.send(str(heart_rate))

        except ConnectionClosed:
            return
        except asyncio.CancelledError:
            raise
        except Exception as error:
            print(f"Fehler bei der Polar-Verbindung: {error}")

        print(
            f"Polar-Verbindung unterbrochen. "
            f"Neuer Versuch in {RETRY_DELAY_SECONDS} Sekunden."
        )
        await asyncio.sleep(RETRY_DELAY_SECONDS)


async def handler(websocket):
    try:
        await stream_heart_rate(websocket)
    except ConnectionClosed:
        pass
    except asyncio.CancelledError:
        raise
    except Exception as error:
        print(f"WebSocket-Fehler: {error}")


async def main():
    print("Herzfrequenz-Backend läuft auf ws://localhost:8765")

    async with websockets.serve(handler, "localhost", 8765):
        await asyncio.Future()


if __name__ == "__main__":
    with contextlib.suppress(KeyboardInterrupt):
        asyncio.run(main())