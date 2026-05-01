from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from prompts import GenerateRequest, get_prompt
from llm_service import generate_test_code

import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="InspectML API")

# Enable CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/generate-tests")
async def generate_tests(request: GenerateRequest):
    try:
        logger.info(f"Generating tests for framework: {request.framework}")
        prompt = get_prompt(request.requirement, request.framework)
        code = generate_test_code(prompt)
        
        if not code:
            logger.warning("Sarvam API returned empty content")
            return {"code": "# Error: AI failed to generate code. Please try a different requirement."}

        # Clean up the output if the LLM includes markdown code blocks
        code_str = code.strip()
        if code_str.startswith("```"):
            lines = code_str.splitlines()
            if lines[0].startswith("```"):
                lines = lines[1:]
            if lines and lines[-1].startswith("```"):
                lines = lines[:-1]
            code = "\n".join(lines).strip()
        else:
            code = code_str
            
        logger.info("Successfully generated test code")
        return {"code": code}
    except Exception as e:
        logger.error(f"Error generating tests: {str(e)}", exc_info=True)
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy"}
