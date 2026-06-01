import asyncio
import websockets
from bleak import BleakClient, BleakScanner

HR_UUID = "00002a37-0000-1000-8000-00805f9b34fb"

async def find_polar():
    devices = await BleakScanner.discover()
    for d in devices:
        if d.name and "Polar" in d.name:
            return d.address
    return None

async def handler(websocket):
    address = await find_polar()
    if not address:
        print("⚠️  No Polar H10 found")
        return

    async with BleakClient(address) as client:
        def hr_callback(sender, data):
            asyncio.ensure_future(websocket.send(str(data[1])))

        await client.start_notify(HR_UUID, hr_callback)
        await websocket.wait_closed()

async def main():
    async with websockets.serve(handler, "localhost", 8765):
        await asyncio.Future()

asyncio.run(main())