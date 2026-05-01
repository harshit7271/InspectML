import os
import requests
from dotenv import load_dotenv

load_dotenv()

SARVAM_API_KEY = os.getenv("SARVAM_API_KEY")
SARVAM_API_URL = "https://api.sarvam.ai/v1/chat/completions"

import logging

logger = logging.getLogger(__name__)

import re

def extract_code_blocks(text: str) -> str:
    if not text:
        return ""
    # Find all markdown code blocks
    code_blocks = re.findall(r'```(?:[a-zA-Z0-9]+)?\n(.*?)\n```', text, re.DOTALL)
    if code_blocks:
        # Return the last one as it's usually the most refined or complete
        return code_blocks[-1].strip()
    return text.strip()

def generate_test_code(prompt: str) -> str:
    headers = {
        "Authorization": f"Bearer {SARVAM_API_KEY}",
        "Content-Type": "application/json"
    }
    
    payload = {
        "model": "sarvam-30b",
        "messages": [
            {
                "role": "system", 
                "content": "You are an expert QA automation engineer. Output ONLY clean, executable code. No explanations. No preamble. No reasoning in the final response. Start directly with the code."
            },
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.0,
        "max_tokens": 4096,
    }

    logger.info(f"Calling Sarvam API with model: {payload['model']}")
    try:
        response = requests.post(SARVAM_API_URL, json=payload, headers=headers)
        logger.info(f"Sarvam API Response Status: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            message = data.get('choices', [{}])[0].get('message', {})
            content = message.get('content')
            reasoning = message.get('reasoning_content')
            
            # Prefer content, fallback to reasoning
            raw_output = content or reasoning
            
            if not raw_output:
                logger.warning("Both content and reasoning_content are empty")
                return ""
                
            return extract_code_blocks(raw_output)
        else:
            error_msg = f"Sarvam API Error: {response.status_code} - {response.text}"
            logger.error(error_msg)
            raise Exception(error_msg)
    except Exception as e:
        logger.error(f"Request to Sarvam API failed: {str(e)}")
        raise e
