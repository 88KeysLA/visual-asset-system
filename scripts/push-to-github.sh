#!/bin/bash
# Push generated visuals to GitHub for durable storage

cd "$(dirname "$0")/.."

# Add all generated files
git add output/production/*.mp4 output/production/*.png

# Commit with timestamp
git commit -m "Generated visuals $(date +%Y-%m-%d_%H:%M:%S)" || echo "No new files to commit"

# Push to GitHub
git push origin main

echo "✓ Pushed to GitHub"
