from pydantic import BaseModel
from typing import Literal

FRAMEWORK_NAMES = {
    "pytest": "Pytest (Python)",
    "playwright_js": "Playwright (JavaScript)",
    "playwright_py": "Playwright (Python)",
    "selenium_py": "Selenium (Python)",
    "selenium_js": "Selenium (JavaScript)"
}

PROMPT_TEMPLATE = "Generate executable {framework_name} test code for this requirement: {user_input}"

class GenerateRequest(BaseModel):
    requirement: str
    framework: Literal["pytest", "playwright_js", "playwright_py", "selenium_py", "selenium_js"]

def get_prompt(requirement: str, framework: str) -> str:
    framework_name = FRAMEWORK_NAMES.get(framework, framework)
    return PROMPT_TEMPLATE.format(framework_name=framework_name, user_input=requirement)
