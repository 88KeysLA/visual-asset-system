# Villa Visual Generation System - Demo Guide

## 🎬 What's Been Built

### 1. **BPM-Synced Video Generation**
- Gemini Nano Banana 2 (FREE image generation)
- Runway Gen-4.5 (video animation)
- FFmpeg time-stretching for exact BPM sync
- Cost: ~$0.05-0.10 per video

### 2. **Villa Portal Integration**
- New "Visuals" tab in portal
- Real-time generation with progress tracking
- Cached visual library
- Auto-generate on track change

### 3. **Demo Features**
- ✅ 8 Genre Presets (one-click access)
- ✅ Fullscreen mode (double-click or button)
- ✅ 15 Pre-generated visuals (all genres)
- ✅ Auto-generate toggle
- ✅ Smart BPM/mood estimation
- ✅ Visual cache grid

## 🎯 Demo Script (5 minutes)

### **Opening (30 seconds)**
"This is our BPM-synced visual generation system. It creates music visualizations that perfectly match the tempo of any track."

### **Quick Demo (1 minute)**
1. Click "🎹 Chill Lounge" preset
2. Video plays instantly (cached)
3. "This is 70 BPM - notice the slow, flowing motion"
4. Click "💃 Dance Party" preset
5. "Now 128 BPM - much faster, more energetic"

### **Show BPM Sync (1 minute)**
1. Click "🎻 Classical" (66 BPM)
2. "Watch the motion - very slow and calm"
3. Click "Drum & Bass" from cache (174 BPM)
4. "Same visual style, but 2.6x faster - perfectly synced"

### **Fullscreen Experience (30 seconds)**
1. Double-click video
2. "Immersive fullscreen mode"
3. ESC to exit

### **Auto-Generate (1 minute)**
1. Go to Music tab
2. Play a track
3. Go back to Visuals tab
4. Click "Auto-Generate: OFF" → ON
5. Go back to Music, change track
6. "System automatically generates matching visual"

### **Technical Deep Dive (1 minute)**
"Here's how it works:
1. Gemini generates static image (FREE, 15-30s)
2. Runway animates it (5-10 credits, 10-15s)
3. FFmpeg time-stretches to exact BPM (2-5s)
4. Result: Perfect sync to any tempo"

### **Closing (30 seconds)**
"We've pre-generated 15 visuals covering:
- Classical to Drum & Bass (66-174 BPM)
- All moods (calm, happy, energetic, dark, mysterious)
- Instant playback, no waiting"

## 📊 Pre-Generated Library

| Genre | BPM | Mood | Name |
|-------|-----|------|------|
| Classical | 66 | Calm | classical_calm |
| Chill | 70 | Calm | chill_lounge |
| Hip Hop | 93 | Dark | hiphop_dark |
| Rock | 116 | Energetic | rock_energy |
| Pop | 117 | Mysterious | pop_mysterious |
| Pop | 120 | Happy | pop_happy |
| EDM | 126 | Happy | edm_happy |
| Dance | 128 | Energetic | dance_party |
| EDM | 128 | Mysterious | edm_mysterious |
| Trance | 132 | Calm | trance_calm |
| Trance | 138 | Dark | trance_dark |
| Dark Club | 140 | Dark | dark_club |
| Fast Pop | 160 | Happy | fast_pop |
| DnB | 174 | Energetic | dnb_energy |
| DnB | 174 | Dark | dnb_dark |

## 🎮 Interactive Demo Features

### **Preset Buttons**
- 🎹 Chill Lounge (70 BPM, calm)
- 💃 Dance Party (128 BPM, energetic)
- 🌑 Dark Club (140 BPM, dark)
- 😊 Happy Hour (120 BPM, happy)
- 🎸 Rock Energy (116 BPM, energetic)
- 🎤 Hip Hop (93 BPM, dark)
- ✨ Trance (138 BPM, mysterious)
- 🎻 Classical (66 BPM, calm)

### **Controls**
- Manual BPM input (40-200)
- Mood selector (6 moods)
- Generate button
- Auto-generate toggle
- Fullscreen button

### **Cache Grid**
- Hover to preview
- Click to load
- Shows BPM + mood

## 🚀 Quick Start

1. **Open Portal**: http://192.168.0.60:8406
2. **Click "Visuals" tab**
3. **Click any preset** → instant playback
4. **Double-click video** → fullscreen
5. **Enable auto-generate** → automatic on track change

## 💡 Key Selling Points

1. **Perfect BPM Sync** - Not approximate, exact timing
2. **Instant Playback** - Cached visuals load immediately
3. **Cost Effective** - $0.05-0.10 per video, Gemini is FREE
4. **Fast Generation** - 30-50 seconds total
5. **Genre Coverage** - Classical to DnB (66-174 BPM)
6. **Mood Variety** - 6 distinct moods
7. **Auto-Generate** - Set it and forget it
8. **Professional UI** - Fullscreen, presets, cache grid

## 📈 Performance Stats

- **Generation Time**: 30-50 seconds
- **Cost**: $0.05-0.10 per video
- **Cache Hit**: Instant (0s)
- **Library Size**: 15 videos = ~$1.50 total
- **BPM Range**: 40-200 BPM
- **Video Quality**: 4K, 30fps
- **Aspect Ratio**: 16:9

## 🎵 Iconic Tracks Covered

- **Classical**: Chopin, Mozart, Beethoven
- **Jazz**: Miles Davis, Billie Holiday
- **Rock**: Queen, Led Zeppelin, Nirvana
- **Hip Hop**: Dr. Dre, Kendrick Lamar
- **Pop**: Michael Jackson, Taylor Swift
- **EDM**: Daft Punk, Avicii, Calvin Harris
- **Trance**: Tiësto, Armin van Buuren
- **DnB**: Pendulum, Netsky

## 🔧 Technical Stack

- **Image Gen**: Gemini Nano Banana 2 (Google)
- **Video Gen**: Runway Gen-4.5
- **Time-Stretch**: FFmpeg
- **Backend**: Node.js + Express
- **Frontend**: Vanilla JS
- **Cache**: Filesystem
- **Integration**: Villa Portal

## ✅ Status

- [x] BPM sync with FFmpeg
- [x] Villa portal integration
- [x] 15 pre-generated visuals
- [x] 8 genre presets
- [x] Fullscreen mode
- [x] Auto-generate
- [x] Cache system
- [x] Smart BPM/mood estimation

**Ready for demo!** 🎉
