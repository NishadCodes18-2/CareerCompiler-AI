# Contributing to CareerCompiler AI

We welcome contributions from students, engineers, and researchers!

## Code of Conduct & Core Principles
1. **Never allow unverified metric generation**: Pull requests that add freeform generation of unverified performance metrics or claims without supporting evidence schemas will be rejected.
2. **Deterministic Fallbacks**: Every module that queries LLM services must have a reliable, offline-safe deterministic fallback.
3. **Type Safety**: Strictly adhere to TypeScript and Python type hints.

## Local Development Workflow
1. Fork and clone the repository.
2. Set up backend virtual environment:
   ```bash
   python -m venv venv
   # On Windows:
   .\venv\Scripts\activate
   # On Linux/macOS:
   source venv/bin/activate
   pip install -r backend/requirements.txt
   ```
3. Run backend tests:
   ```bash
   pytest -v backend/tests/test_api.py
   ```
4. Set up frontend:
   ```bash
   cd frontend
   npm install
   npm run build
   ```
5. Submit a pull request with clear descriptions of your evidence or compiler pipeline additions.
