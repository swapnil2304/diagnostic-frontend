from fastapi import FastAPI, WebSocket, WebSocketDisconnect, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

clients = []

@app.websocket("/ws/notifications")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    clients.append(websocket)
    try:
        while True:
            await websocket.receive_text()  # keeps connection open
    except WebSocketDisconnect:
        clients.remove(websocket)

class NotificationRequest(BaseModel):
    message: str

@app.post("/send-notification")
async def send_notification(payload: NotificationRequest):
    for client in clients:
        await client.send_json({"message": payload.message})
    return {"status": "Notification sent to all connected clients."}

@app.post("/case-assigned")
async def notify_case_assigned(payload: NotificationRequest):
    message = f"📦 Case Assigned: {payload.message}"
    for client in clients:
        await client.send_json({"message": message})
    return {"status": "Case assignment notification sent."}

@app.post("/ai-analysis")
async def notify_ai_analysis(payload: NotificationRequest):
    message = f"🤖 AI Analysis Complete: {payload.message}"
    for client in clients:
        await client.send_json({"message": message})
    return {"status": "AI analysis notification sent."}

@app.post("/peer-review")
async def notify_peer_review(payload: NotificationRequest):
    message = f"🧑‍⚕️ Peer Review Feedback: {payload.message}"
    for client in clients:
        await client.send_json({"message": message})
    return {"status": "Peer review feedback notification sent."}
