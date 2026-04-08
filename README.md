# Linguistic Pragmatics & Social Hierarchy Classifier (PDA)

## 🧠 Project Overview
In digital communication, we lose non-verbal cues (body language, eye contact). This project solves the "Invisible Hierarchy" problem:
- **Identification of Bias:** Detecting if certain group members are being silenced or ignored.
- **Leadership Assessment:** Identifying natural leaders who drive progress without being aggressive.
- **Conflict Resolution:** Pinpointing the exact moment a professional discussion turned into a power struggle.

## 🎯 Target Users & Use Cases
| Target User | Use Case Scenario | Benefit |
| ----------- | ----------------- | ------- |
| HR / Team Leads | Reviewing Slack or Teams channels for team health. | Identifies "Linguistic Bullying" or if a manager is micro-managing. |
| Customer Support | Analyzing Agent-Customer interactions. | Detects when a customer feels "pushed around" or when an agent loses control. |
| User Research | Focus group transcript analysis. | Ensures the data isn't biased by one dominant participant. |
| Personal Growth | Analyzing your own emails or chat history. | Helps you become more assertive or empathetic. |

## 🚀 Advanced Feature Set
1. **Turn-Taking Latency:** Who makes others wait for a reply? Who replies instantly?
2. **Hedge & Booster Detection:** Detecting "weak" language (hedges) vs. high-confidence markers (boosters).
3. **Topic Control:** Identifying who introduces a new keyword and who follows it.
4. **Sentiment Asymmetry:** Detecting emotional neutrality vs. reactivity.
5. **The "Agreement" Metric:** Measuring how often peers use phrases like "Exactly", "I agree", or "Right" in response.

## 📊 High-Level System Architecture
- **Ingestion:** API Gateway / JSON Upload (Node.js / Express)
- **NLP Engine:** Feature Extraction (Python / spaCy)
- **Intelligence:** Intent Classification (HuggingFace BERT/RoBERTa)
- **Analytics:** Behavioral Scoring Logic (Custom Python Script)
- **Storage:** Conversational Logs & Final Scores (MongoDB)
- **Delivery:** Dynamic Dashboard & Timeline Visualization (React)

## 📁 Code Structure
- **Root Folder:** `power-dynamics-analyzer/`
- **Backend:** Node.js + Express (`backend/`)
- **AI Service:** Python + FastAPI (`ai-service/`)
- **Frontend:** React + Tailwind + Vite (`frontend/`)

## 💡 System Flow
`Frontend (React) -> Node.js API (Express) -> MongoDB -> FastAPI (NLP Engine) -> Model -> Results -> Node -> React`
