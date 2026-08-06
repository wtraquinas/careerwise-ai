#!/bin/bash
set -e

echo "🚀 Setting up CareerWise..."

# Backend
if [ -f backend/requirements.txt ]; then
  python -m venv backend/.venv
  source backend/.venv/bin/activate
  pip install -r backend/requirements.txt
fi

# Frontend
if [ -f frontend/package.json ]; then
  cd frontend
  npm install
fi

echo "✅ CareerWise development environment is ready!"