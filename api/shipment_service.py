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
    {"id": "SHP-1001", "status": "In Transit", "last_location": "Dubai Port"},
    {"id": "SHP-1002", "status": "Delivered", "last_location": "Riyadh Hub"},
    {"id": "SHP-1003", "status": "Pending", "last_location": "Abu Dhabi Warehouse"}
]

@app.get("/api/v1/shipments")
def get_shipments():
    logger.info("Shipment tracking data requested")
    return {"shipments": MOCK_SHIPMENTS}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
