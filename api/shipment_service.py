from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import logging

# D44 Logging (LogSieve Pattern)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s | %(levelname)-8s | %(name)s | %(message)s"
)
logger = logging.getLogger("PLA-D44-LogSieve")

app = FastAPI(title="GlobalShip Live Tracker API")

# Configure CORS for React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MOCK_SHIPMENTS = [
    {"id": "SHP-1001", "status": "In Transit", "last_location": "Dubai Port", "latitude": 25.2048, "longitude": 55.2708},
    {"id": "SHP-1002", "status": "Delivered", "last_location": "Riyadh Hub", "latitude": 24.7136, "longitude": 46.6753},
    {"id": "SHP-1003", "status": "Pending", "last_location": "Abu Dhabi Warehouse", "latitude": 24.4539, "longitude": 54.3773}
]

@app.get("/api/v1/shipments")
def get_shipments():
    logger.info("Shipment tracking data requested")
    logger.info("Live map tracking data fetched")
    return {"shipments": MOCK_SHIPMENTS}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
