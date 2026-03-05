#!/bin/bash
# Batch generate visuals for demo
# Covers all major genres and BPM ranges

cd "$(dirname "$0")/.."

echo "🎬 Generating demo visual library..."
echo "This will take ~5-7 minutes total"
echo ""

# Chill/Ambient (60-80 BPM)
echo "1/15: Chill Lounge (70 BPM, calm)"
npm run generate 70 calm chill_lounge

echo "2/15: Classical Calm (66 BPM, calm)"
npm run generate 66 calm classical_calm

# Pop/Rock (100-120 BPM)
echo "3/15: Pop Happy (120 BPM, happy)"
npm run generate 120 happy pop_happy

echo "4/15: Rock Energy (116 BPM, energetic)"
npm run generate 116 energetic rock_energy

echo "5/15: Pop Mysterious (117 BPM, mysterious)"
npm run generate 117 mysterious pop_mysterious

# Hip Hop (90-100 BPM)
echo "6/15: Hip Hop Dark (93 BPM, dark)"
npm run generate 93 dark hiphop_dark

# EDM/Dance (120-130 BPM)
echo "7/15: Dance Party (128 BPM, energetic)"
npm run generate 128 energetic dance_party

echo "8/15: EDM Happy (126 BPM, happy)"
npm run generate 126 happy edm_happy

echo "9/15: EDM Mysterious (128 BPM, mysterious)"
npm run generate 128 mysterious edm_mysterious

# Trance (130-150 BPM)
echo "10/15: Trance Dark (138 BPM, dark)"
npm run generate 138 dark trance_dark

echo "11/15: Trance Calm (132 BPM, calm)"
npm run generate 132 calm trance_calm

# Fast (140-180 BPM)
echo "12/15: Dark Club (140 BPM, dark)"
npm run generate 140 dark dark_club

echo "13/15: Fast Pop (160 BPM, happy)"
npm run generate 160 happy fast_pop

echo "14/15: Drum & Bass (174 BPM, energetic)"
npm run generate 174 energetic dnb_energy

echo "15/15: Drum & Bass Dark (174 BPM, dark)"
npm run generate 174 dark dnb_dark

echo ""
echo "✅ Demo library complete!"
echo "Generated 15 visuals covering all genres"
echo ""
echo "Cache location: ./output/production/"
