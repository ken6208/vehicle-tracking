import csv
import json
import asyncio
import websockets

def load_gps_data(filename):
    gps_data = []
    with open(filename, 'r') as f:
        reader = csv.DictReader(f)
        for row in reader:
            gps_data.append({
                "lat": float(row["location.__lat__"]),
                "lng": float(row["location.__lon__"]),
                "speed": float(row["speed"]),
                "bearing": float(row["bearing"])
            })
    return gps_data

async def gps_stream(websocket):
    """
    This function is called by websockets.serve()
    with two arguments: (websocket, path).
    """
    gps_data = load_gps_data("heartbeat.csv")
    index = 0
    forward = True
    while True:
        try:
            # Send current location
            await websocket.send(json.dumps(gps_data[index]))
            print(f"Sent: {gps_data[index]}")

            # Move index forward/backward
            if forward:
                index += 1
                if index >= len(gps_data):
                    index = len(gps_data) - 2
                    forward = False
            else:
                index -= 1
                if index < 0:
                    index = 1
                    forward = True

            # 500ms delay
            await asyncio.sleep(0.5)
        except websockets.exceptions.ConnectionClosedError:
            print("Client disconnected unexpectedly.")
            break
        except Exception as e:
            print(f"Error: {e}")
            break

async def main():
    # 1) websockets.serve() will call gps_stream(websocket, path)
    # 2) No lambdas needed—pass function directly
    async with websockets.serve(gps_stream, "0.0.0.0", 8765):
        print("WebSocket server started on ws://localhost:8765")
        await asyncio.Future()  # block forever

if __name__ == "__main__":
    asyncio.run(main())