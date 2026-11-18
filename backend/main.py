import asyncio
import contextlib
import json
from datetime import datetime, timedelta, timezone

import websockets
from bleak import BleakClient, BleakScanner
from websockets.exceptions import ConnectionClosed

HR_UUID = "00002a37-0000-1000-8000-00805f9b34fb"
RETRY_DELAY_SECONDS = 3


def iso_time(moment: datetime) -> str:
    """UTC-Zeitstempel im selben Format wie JavaScripts Date.toISOString()."""
    return moment.astimezone(timezone.utc).isoformat(timespec="milliseconds").replace("+00:00", "Z")


def parse_heart_rate(data: bytearray) -> dict:
    """Parst das Bluetooth Heart Rate Measurement (GATT 0x2A37).

    Byte 0 enthält die Flags:
      Bit 0: Herzfrequenz als uint16 statt uint8
      Bit 1: Hautkontakt erkannt
      Bit 2: Kontakterkennung wird unterstützt (beim Polar H10 immer gesetzt)
      Bit 3: Energy-Expended-Feld (2 Byte) vorhanden
      Bit 4: RR-Intervalle vorhanden (je uint16 in 1/1024 s)

    Rückgabe: {"bpm": int, "contact": 0|1, "rrMs": [int, ...]}
    """
    if len(data) < 2:
        raise ValueError("Unvollständiges Heart-Rate-Paket")

    flags = data[0]

    if flags & 0x01:
        if len(data) < 3:
            raise ValueError("Unvollständiger 16-Bit-Herzfrequenzwert")
        bpm = int.from_bytes(data[1:3], byteorder="little")
        index = 3
    else:
        bpm = data[1]
        index = 2

    # Ohne Kontakterkennung gibt es keinen Hinweis auf fehlenden Kontakt -> 1
    contact_supported = bool(flags & 0x04)
    contact = int(bool(flags & 0x02)) if contact_supported else 1

    if flags & 0x08:
        index += 2

    rr_ms = []
    if flags & 0x10:
        while index + 1 < len(data):
            raw = int.from_bytes(data[index:index + 2], byteorder="little")
            rr_ms.append(round(raw * 1000 / 1024))
            index += 2

    return {"bpm": bpm, "contact": contact, "rrMs": rr_ms}


def build_message(device_name: str, received: datetime, measurement: dict) -> dict:
    """Nachricht an das Frontend; Feldnamen wie in HR_SAMPLE / RR_INTERVAL.

    Ein Paket kann mehrere RR-Intervalle enthalten. Das letzte endet ungefähr
    beim Empfang, die früheren entsprechend davor (rrTime = Ende des Intervalls).
    """
    rr_intervals = []
    end = received
    for rr_ms in reversed(measurement["rrMs"]):
        rr_intervals.append({"rrTime": iso_time(end), "rrMs": rr_ms})
        end -= timedelta(milliseconds=rr_ms)
    rr_intervals.reverse()

    return {
        "polarDevID": device_name,
        "hrTime": iso_time(received),
        "bpm": measurement["bpm"],
        "contact": measurement["contact"],
        "rrIntervals": rr_intervals,
    }


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

        queue: asyncio.Queue[dict] = asyncio.Queue()
        disconnected = asyncio.Event()
        loop = asyncio.get_running_loop()

        def handle_disconnect(_client):
            loop.call_soon_threadsafe(disconnected.set)

        def handle_heart_rate(_sender, data: bytearray, device_name=device.name):
            received = datetime.now(timezone.utc)   # Zeitpunkt so früh wie möglich festhalten
            try:
                message = build_message(device_name, received, parse_heart_rate(data))
                loop.call_soon_threadsafe(queue.put_nowait, message)
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
                        message = await asyncio.wait_for(
                            queue.get(),
                            timeout=1.0,
                        )
                    except asyncio.TimeoutError:
                        continue

                    await websocket.send(json.dumps(message))

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