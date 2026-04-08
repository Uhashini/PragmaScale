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
    
    # Generate dynamic timeline for N users
    timeline = []
    users_list = [r["name"] for r in results]
    num_users = len(users_list)
    
    # Start at even power setting
    current_power = {u: 100.0 / num_users for u in users_list} if num_users > 0 else {}
    
    for i, msg in enumerate(payload.messages):
        sender = msg.sender
        
        # A simple algorithm to shift power dynamically per message
        if num_users > 1 and sender in current_power:
            # The sender exerts some conversational power
            gain = random.randint(2, 6)
            current_power[sender] += gain
            
            # Distribute the loss evenly across everyone else
            others = [u for u in users_list if u != sender]
            loss_per_person = gain / len(others)
            
            for o in others:
                current_power[o] = max(0.0, current_power[o] - loss_per_person)
                
            # Re-normalize to exactly 100% to prevent drift
            total = sum(current_power.values())
            if total > 0:
                for u in users_list:
                    current_power[u] = (current_power[u] / total) * 100

        # Construct timeline payload dynamically
        timeline_entry = {"msgId": i}
        for u in users_list:
            timeline_entry[u] = round(current_power.get(u, 0), 1)
            
        timeline.append(timeline_entry)

    # Extract top empirical directives and hedges from the raw messages for evidence
    all_texts = [m.text for m in payload.messages]
    
    # Very simple heuristics to populate dynamic evidence based on actual file payload
    directives = [t for t in all_texts if any(w in t.lower() for w in ["do it", "now", "immediately", "delay", "fix it", "submit", "complete"])]
    hedges = [t for t in all_texts if any(w in t.lower() for w in ["think", "maybe", "perhaps", "kind of", "not entirely sure"])]

    # Dynamic fallback system
    if not directives: directives = ["(No strong directives detected in this segment)"]
    if not hedges: hedges = ["(No submissive markers detected in this segment)"]

    return {
        "users": results,
        "timeline": timeline,
        "evidence": {
            "top_directives": list(set(directives))[:3],
            "top_hedges": list(set(hedges))[:3]
        }
    }
