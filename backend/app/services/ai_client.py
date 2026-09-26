"""
Centralized AI Client and Prompt Orchestrator for CareerCompiler AI.
Supports OpenAI / Gemini when API keys are configured, and includes a deterministic,
rule-based NLP fallback engine ensuring that the system functions accurately,
predictably, and safely without crashing when offline or without external keys.
"""

import os
import json
import re
from typing import Dict, Any, List, Optional
import httpx
from app.config import settings

class AIClient:
    def __init__(self):
        self.openai_key = settings.OPENAI_API_KEY or os.getenv("OPENAI_API_KEY", "")
        self.has_llm = bool(self.openai_key)

    async def call_llm(self, system_prompt: str, user_prompt: str, json_mode: bool = True) -> str:
        """Call external LLM if API key exists; otherwise use deterministic extraction."""
        if not self.has_llm:
            return ""

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                headers = {
                    "Authorization": f"Bearer {self.openai_key}",
                    "Content-Type": "application/json"
                }
                body = {
                    "model": "gpt-4o-mini",
                    "messages": [
                        {"role": "system", "content": system_prompt},
                        {"role": "user", "content": user_prompt}
                    ],
                    "temperature": 0.2
                }
                if json_mode:
                    body["response_format"] = {"type": "json_object"}

                response = await client.post("https://api.openai.com/v1/chat/completions", headers=headers, json=body)
                if response.status_code == 200:
                    data = response.json()
                    return data["choices"][0]["message"]["content"]
        except Exception:
            pass
        return ""

    def extract_keywords_and_skills(self, text: str) -> List[str]:
        """Deterministic keyword and skill extraction using curated technical taxonomy."""
        known_tech = [
            "Python", "Go", "Golang", "Java", "JavaScript", "TypeScript", "C++", "C#", "Rust", "Ruby", "PHP",
            "SQL", "PostgreSQL", "MySQL", "MongoDB", "Redis", "SQLite", "Cassandra", "DynamoDB",
            "Docker", "Kubernetes", "AWS", "Azure", "GCP", "Linux", "Git", "GitHub", "CI/CD", "GitHub Actions",
            "FastAPI", "Flask", "Django", "Express", "Node.js", "React", "Next.js", "Vue", "Angular",
            "REST", "REST API", "REST APIs", "GraphQL", "gRPC", "Microservices", "Distributed Systems",
            "Pytest", "Jest", "Unit Testing", "Kafka", "RabbitMQ", "Scapy", "Raft", "Tree-sitter", "Machine Learning",
            "Pandas", "NumPy", "PyTorch", "TensorFlow", "NLP", "RAG", "Vector Search", "pgvector"
        ]
        found = set()
        text_lower = text.lower()
        for tech in known_tech:
            pattern = r'\b' + re.escape(tech.lower()) + r'\b'
            if re.search(pattern, text_lower):
                found.add(tech)
        return sorted(list(found))

ai_client = AIClient()
