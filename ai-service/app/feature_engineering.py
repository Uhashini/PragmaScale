from typing import List, Dict

# Linguistic markers dictionary
HEDGE_WORDS = ["think", "maybe", "perhaps", "guess", "fairly", "kind of"]
BOOSTER_WORDS = ["definitely", "absolutely", "clearly", "obviously", "must"]

def extract_features(messages: List) -> Dict[str, Dict]:
    """
    Extract linguistic features per participant from a series of messages.
    """
    user_features = {}
    
    for msg in messages:
        sender = msg.sender
        text = msg.text.lower()
        
        if sender not in user_features:
            user_features[sender] = {
                "message_count": 0,
                "hedges": 0,
                "boosters": 0,
                "directives": 0,
                "word_count": 0
            }
            
        user_features[sender]["message_count"] += 1
        user_features[sender]["word_count"] += len(text.split())
        
        # Simple heuristic mapping
        for hedge in HEDGE_WORDS:
            if hedge in text:
                user_features[sender]["hedges"] += 1
                
        for booster in BOOSTER_WORDS:
            if booster in text:
                user_features[sender]["boosters"] += 1
                
        # Basic heuristic for directives lacking politeness
        if text.startswith("do ") or text.startswith("send ") or text.startswith("submit "):
            user_features[sender]["directives"] += 1
            
    return user_features
