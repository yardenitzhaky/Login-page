#!/bin/bash
python -m pip install --upgrade pip
pip install -r requirements.txt
echo "gunicorn --bind=0.0.0.0:8000 --timeout=30 --workers=2 --threads=2 app:app" > startup.sh