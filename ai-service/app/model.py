from typing import Dict, List

def predict_dominance(user_features: Dict[str, Dict]) -> List[Dict]:
    """
    Calculates dominance score based on extracted features.
    Simulates regression model weighting prior to embedding XGBoost.
    """
    results = []
    
    for sender, feats in user_features.items():
        base_score = 50
        
        # Weighted Scoring Logic (Simplified Matrix)
        directives_bonus = feats["directives"] * 5
        boosters_bonus = feats["boosters"] * 2
        hedges_penalty = feats["hedges"] * 3
        
        raw_score = base_score + directives_bonus + boosters_bonus - hedges_penalty
        
        results.append({
            "name": sender,
            "dominance": max(1, min(99, raw_score)) # Clamp
        })
        
    # Relative normalization (zero-sum power dynamic)
    total_score = sum(r["dominance"] for r in results)
    
    normalized_results = []
    if total_score > 0:
        for r in results:
            normalized_results.append({
                "name": r["name"],
                "dominance": round((r["dominance"] / total_score) * 100)
            })
    else:
        # Fallback parity
        for r in results:
            normalized_results.append({
                "name": r["name"],
                "dominance": round(100 / len(results))
            })

    return normalized_results
