# Music Visualization Style Guide
## Mood & BPM-Based Visual Design

### BPM Tempo Ranges & Visual Characteristics

#### **Slow (40-80 BPM)** - Ambient, Meditation, Ballads
- **Motion**: Smooth, slow transitions; gentle flowing movements
- **Colors**: Desaturated, cool palettes (blues, purples, grays)
- **Shapes**: Organic, fluid forms; soft gradients
- **Lighting**: Soft, diffused; minimal contrast
- **Camera**: Slow dolly, subtle drift
- **Prompt Keywords**: "ethereal", "floating", "gentle waves", "soft glow", "dreamy"

#### **Moderate (80-120 BPM)** - Pop, Hip-Hop, Walking Pace
- **Motion**: Steady rhythm; human-paced movement
- **Colors**: Balanced saturation; warm or neutral tones
- **Shapes**: Geometric patterns; balanced symmetry
- **Lighting**: Natural, even lighting
- **Camera**: Steady pan, moderate zoom
- **Prompt Keywords**: "rhythmic", "steady pulse", "balanced", "natural flow"

#### **Upbeat (120-140 BPM)** - Dance, House, Energetic
- **Motion**: Quick cuts; bouncing elements; synchronized beats
- **Colors**: Vibrant, saturated; high contrast
- **Shapes**: Sharp angles; dynamic patterns
- **Lighting**: Strobing effects; color shifts on beat
- **Camera**: Quick pans, rhythmic cuts
- **Prompt Keywords**: "energetic", "pulsing", "vibrant", "dynamic", "sharp"

#### **Fast (140-180 BPM)** - Drum & Bass, Techno, High Energy
- **Motion**: Rapid transitions; staccato movements; particle effects
- **Colors**: Neon, electric; extreme contrast
- **Shapes**: Fractals; chaotic patterns; glitch effects
- **Lighting**: Strobe, laser-like; intense flashes
- **Camera**: Fast whip pans, rapid zooms
- **Prompt Keywords**: "frenetic", "explosive", "electric", "chaotic", "intense"

#### **Very Fast (180+ BPM)** - Hardcore, Speed Metal
- **Motion**: Blur effects; extreme speed; aggressive cuts
- **Colors**: Monochrome or extreme saturation
- **Shapes**: Abstract; distorted; aggressive
- **Lighting**: Harsh, industrial; high contrast shadows
- **Camera**: Disorienting movement; extreme angles
- **Prompt Keywords**: "aggressive", "violent motion", "distorted", "harsh", "extreme"

---

### Mood-Based Visual Styles

#### **Happy / Uplifting**
- **Colors**: Warm yellows, oranges, bright pastels
- **Motion**: Bouncing, rising movements
- **Lighting**: Bright, sunny, golden hour
- **Prompt**: "joyful, bright sunlight, warm colors, uplifting motion, cheerful atmosphere"

#### **Sad / Melancholic**
- **Colors**: Cool blues, grays, desaturated tones
- **Motion**: Slow descent, fading, drifting
- **Lighting**: Overcast, soft shadows, muted
- **Prompt**: "melancholic, rain-soaked, cool tones, slow fade, isolated, empty spaces"

#### **Energetic / Excited**
- **Colors**: Neon, electric, high saturation
- **Motion**: Fast cuts, explosive bursts
- **Lighting**: Strobe, dynamic color shifts
- **Prompt**: "explosive energy, neon lights, rapid motion, vibrant colors, electric atmosphere"

#### **Calm / Peaceful**
- **Colors**: Soft pastels, earth tones
- **Motion**: Gentle sway, slow pan
- **Lighting**: Soft diffused, natural
- **Prompt**: "serene, gentle breeze, soft lighting, peaceful flow, natural harmony"

#### **Dark / Intense**
- **Colors**: Deep blacks, dark reds, purples
- **Motion**: Sharp, aggressive, angular
- **Lighting**: High contrast, dramatic shadows
- **Prompt**: "dark atmosphere, intense shadows, dramatic lighting, ominous, powerful"

#### **Mysterious / Ethereal**
- **Colors**: Deep purples, teals, misty whites
- **Motion**: Floating, ghostly, unpredictable
- **Lighting**: Fog, volumetric light, mysterious glow
- **Prompt**: "ethereal mist, mysterious glow, floating particles, otherworldly, dreamlike"

---

### AI Prompt Framework for Music Visualization

**Template Structure:**
```
[MOOD] music visualization, [BPM_STYLE] tempo, [COLOR_PALETTE], 
[MOTION_TYPE], [LIGHTING_STYLE], [SHAPE_ELEMENTS], 
cinematic, 4K, photorealistic
```

**Examples:**

**Slow Ambient (60 BPM):**
```
Ethereal music visualization, slow ambient tempo, cool blue and purple gradient, 
gentle flowing waves, soft diffused lighting, organic fluid shapes, 
dreamy atmosphere, cinematic, 4K, photorealistic
```

**Upbeat Dance (128 BPM):**
```
Energetic music visualization, dance tempo 128 BPM, vibrant neon colors, 
pulsing geometric patterns, strobing lights synchronized to beat, 
sharp angular shapes, electric atmosphere, cinematic, 4K, photorealistic
```

**Melancholic Ballad (70 BPM):**
```
Melancholic music visualization, slow ballad tempo, desaturated cool tones, 
slow descending motion, soft shadows, isolated empty spaces, 
rain-soaked atmosphere, cinematic, 4K, photorealistic
```

**Fast Drum & Bass (170 BPM):**
```
Frenetic music visualization, drum & bass 170 BPM, electric neon colors, 
rapid particle explosions, intense strobe lighting, chaotic fractal patterns, 
aggressive energy, cinematic, 4K, photorealistic
```

---

### Integration with Flux & Gemini

**Flux.2 Strengths:**
- Multi-reference consistency (10 images)
- Character/object identity preservation
- Best for: Recurring visual motifs, branded elements

**Gemini Nano Banana 2 Strengths:**
- Fast generation (Flash speed)
- Better text rendering
- Real-time web knowledge
- Best for: Quick iterations, text-heavy visuals, trend-aware designs

**Recommended Workflow:**
1. **Style exploration**: Use Gemini for rapid prototyping (5-10 variants)
2. **Refinement**: Pick best style, create 10-image reference set
3. **Consistency**: Use Flux.2 with reference set for final assets
4. **Animation**: Feed to Runway Gen-4.5 for motion

---

### Villa Audio System Integration

**Use Case**: Generate visualizations based on currently playing track

**API Flow:**
```javascript
// Get current track metadata
const track = await getCurrentTrack();
const { bpm, mood, genre } = await analyzeTrack(track);

// Generate visualization prompt
const prompt = buildVisualizationPrompt(bpm, mood);

// Generate with Gemini (fast) or Flux (consistent)
const visual = await geminiClient.generateImage(prompt);

// Animate with Runway
const video = await runwayClient.imageToVideo(visual, 
  `${mood} motion, ${bpm} BPM rhythm`);
```

**Preset Mappings:**
- **Chill/Lounge (60-90 BPM)**: Soft ambient visuals
- **House/Dance (120-130 BPM)**: Pulsing geometric patterns
- **Drum & Bass (160-180 BPM)**: Rapid particle effects
- **Classical (Variable)**: Flowing organic shapes

---

### Cost Optimization

**Gemini**: Free (via Google Gemini API)
**Flux.2**: ~$0.04/image
**Runway**: ~5-10 credits/video ($0.05-0.10)

**Strategy**: Use Gemini for exploration, Flux for production, Runway for final animation
