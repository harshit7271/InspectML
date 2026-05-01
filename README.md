# InspectML

AI-powered QA tool that converts plain English software requirements into executable automated test code.

## Prerequisites

- Python 3.8+
- Node.js 18+

## Project Structure

```
InspectML/
├── backend/            # FastAPI Backend
│   ├── main.py        # API Entry point
│   ├── prompts.py     # Prompt engineering logic
│   ├── llm_service.py # Sarvam AI integration
│   └── .env           # API Keys
└── frontend/           # Next.js Frontend
    ├── src/
    │   └── app/       # UI Components & Logic
    └── tailwind.config.ts
```

## Setup Instructions

### Backend

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```
3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
4. Run the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```
   The backend will be available at `http://localhost:8000`.

### Frontend

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
   The frontend will be available at `http://localhost:3000`.

## How to Use

1. Open `http://localhost:3000` in your browser.
2. Enter your software requirement in the text field.
3. Select the desired testing framework (Pytest or Playwright).
4. Click "Generate Tests".
5. View the generated code and copy it to your clipboard.
