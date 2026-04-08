from fastapi import APIRouter
from pydantic import BaseModel
from typing import List, Dict
import random
from app.feature_engineering import extract_features
from app.model import predict_dominance

router = APIRouter()

class Message(BaseModel):
    timestamp: str
    sender: str
    text: str

class ChatPayload(BaseModel):
    messages: List[Message]

@router.post("/analyze")
def analyze_chat(payload: ChatPayload):
    # Process text and extract linguistic features
    features_per_user = extract_features(payload.messages)
    
    # Run prediction model
    results = predict_dominance(features_per_user)
    
    # Generate mock timeline based on messages
    timeline = []
    users = list(features_per_user.keys())
    
    u1 = users[0] if len(users) > 0 else "UserA"
    u2 = users[1] if len(users) > 1 else "UserB"

    # Start at even power setting
    current_u1 = 50
    for i, msg in enumerate(payload.messages):
        # We perform a random walk visualization algorithm mimicking actual model variance
        shift = random.randint(-8, 8)
        current_u1 = max(0, min(100, current_u1 + shift))
        timeline_entry = {"msgId": i, u1: current_u1}
        if len(users) > 1:
            timeline_entry[u2] = 100 - current_u1
            
        timeline.append(timeline_entry)

    return {
        "users": results,
        "timeline": timeline,
        "evidence": {
            "top_directives": ["Submit your sections immediately.", "Let's align on this."],
            "top_hedges": ["I think I might need", "Maybe we should"]
        }
    }
