# Visual Asset System

BPM-synced visual generation using Gemini (FREE) + Runway Gen-4.5 + FFmpeg.

## Setup

```bash
npm install
brew install ffmpeg  # Required for BPM time-stretching
cp .env.example .env
# Add your API keys to .env
```

## Usage

Generate single visual:
```bash
node examples/production-pipeline.js <bpm> <preset> <name>
```

Generate demo library (15 visuals):
```bash
./scripts/generate-demo-library.sh
```

Monitor progress:
```bash
./scripts/monitor-generation.sh
```

## Output

Videos saved to `./output/production/` and pushed to GitHub for durable storage.
