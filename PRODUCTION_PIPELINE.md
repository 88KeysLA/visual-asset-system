# Production Pipeline - Gemini + Runway + FFmpeg

## Prerequisites

```bash
brew install ffmpeg
```

## Quick Start

Generate a BPM-synced music visualization:

```bash
npm run generate <bpm> <mood> <output-name>
```

## How It Works

1. **Generate base video** at appropriate speed for BPM range
2. **Time-stretch with FFmpeg** to exact BPM timing
3. **Result**: Perfect sync to any BPM (40-200+)

### Example: 128 BPM
- Target: 10 beats in video
- Duration needed: (10 / 128) * 60 = 4.69 seconds
- Stretch ratio: 4.69 / 5.0 = 0.938x
- Result: Video plays slightly faster to fit exactly 10 beats

## Examples

```bash
# Chill ambient track (70 BPM = 8.57s for 10 beats)
npm run generate 70 calm sunset_lounge

# Upbeat dance track (128 BPM = 4.69s for 10 beats)
npm run generate 128 energetic club_night

# Dark drum & bass (170 BPM = 3.53s for 10 beats)
npm run generate 170 dark underground

# Happy pop song (120 BPM = 5.0s for 10 beats - no stretch!)
npm run generate 120 happy summer_vibes
```

## BPM Sync Details

All videos contain exactly **10 beats**, time-stretched to match BPM:

| BPM | Duration | Stretch Ratio | Beats/Second |
|-----|----------|---------------|--------------|
| 60  | 10.00s   | 2.000x        | 1.00         |
| 80  | 7.50s    | 1.500x        | 1.33         |
| 100 | 6.00s    | 1.200x        | 1.67         |
| 120 | 5.00s    | 1.000x        | 2.00         |
| 128 | 4.69s    | 0.938x        | 2.13         |
| 140 | 4.29s    | 0.857x        | 2.33         |
| 160 | 3.75s    | 0.750x        | 2.67         |
| 170 | 3.53s    | 0.706x        | 2.83         |

## Available Moods

- `happy` - Joyful, bright, uplifting
- `sad` - Melancholic, rain-soaked, isolated
- `energetic` - Explosive, vibrant, electric
- `calm` - Serene, peaceful, gentle
- `dark` - Intense shadows, dramatic, ominous
- `mysterious` - Ethereal, otherworldly, floating

## Output

Each generation creates:
- `{name}_image.png` - Static visualization (Gemini)
- `{name}_video.mp4` - BPM-synced video (Runway + FFmpeg)

Saved to: `./output/production/`

## Performance

- **Image generation**: ~15-30 seconds (Gemini)
- **Video animation**: ~10-15 seconds (Runway)
- **Time-stretching**: ~2-5 seconds (FFmpeg)
- **Total time**: ~30-50 seconds
- **Cost**: ~$0.05-0.10 per visualization (Runway credits only)

## Pipeline Flow

```
BPM + Mood
    ↓
Calculate target duration for 10 beats
    ↓
Gemini Nano Banana 2 (FREE)
    ↓
Static 16:9 image
    ↓
Runway Gen-4.5 (~5-10 credits)
    ↓
5-second base video
    ↓
FFmpeg time-stretch (FREE)
    ↓
BPM-synced video (exact timing)
```

## Integration Ready

This pipeline can be called from:
- Villa audio portal (generate on track change)
- Batch processor (pre-generate library)
- API endpoint (on-demand generation)

## Next Steps

1. ✅ Production pipeline complete
2. ✅ BPM sync with FFmpeg time-stretching
3. ⏳ Integrate with villa audio portal
4. ⏳ Build batch processor for libraries
