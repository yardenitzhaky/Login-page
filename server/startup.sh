#!/bin/bash
python -m pip install --upgrade pip
pip install -r requirements.txt
gunicorn --bind=0.0.0.0 --timeout 30 --workers=2 --threads=2 app:app