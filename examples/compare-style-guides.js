import 'dotenv/config';
import { GeminiClient } from '../lib/gemini-client.js';
import { FluxClient } from '../lib/flux-client.js';
import fs from 'fs/promises';

const geminiClient = new GeminiClient(process.env.GEMINI_API_KEY);
const fluxClient = new FluxClient(process.env.FLUX_API_KEY);

// Music visualization prompt builder
function buildVisualizationPrompt(bpm, mood) {
  const bpmStyles = {
    slow: { range: [40, 80], motion: 'gentle flowing waves', colors: 'cool blue and purple gradient', lighting: 'soft diffused' },
    moderate: { range: [80, 120], motion: 'steady rhythmic pulse', colors: 'balanced warm tones', lighting: 'natural even' },
    upbeat: { range: [120, 140], motion: 'pulsing geometric patterns', colors: 'vibrant neon', lighting: 'strobing synchronized' },
    fast: { range: [140, 180], motion: 'rapid particle explosions', colors: 'electric neon', lighting: 'intense strobe' },
    veryFast: { range: [180, 999], motion: 'chaotic blur effects', colors: 'extreme contrast', lighting: 'harsh industrial' }
  };

  const moodStyles = {
    happy: 'joyful, bright sunlight, warm colors, uplifting motion',
    sad: 'melancholic, rain-soaked, cool tones, slow fade, isolated',
    energetic: 'explosive energy, vibrant colors, rapid motion, electric',
    calm: 'serene, gentle breeze, soft lighting, peaceful flow',
    dark: 'dark atmosphere, intense shadows, dramatic lighting, ominous',
    mysterious: 'ethereal mist, mysterious glow, floating particles, otherworldly'
  };

  // Find BPM category
  let bpmStyle = bpmStyles.moderate;
  for (const [key, style] of Object.entries(bpmStyles)) {
    if (bpm >= style.range[0] && bpm < style.range[1]) {
      bpmStyle = style;
      break;
    }
  }

  const moodDesc = moodStyles[mood.toLowerCase()] || moodStyles.calm;

  return `${moodDesc} music visualization, ${bpm} BPM tempo, ${bpmStyle.colors}, ${bpmStyle.motion}, ${bpmStyle.lighting}, cinematic, 4K, photorealistic`;
}

async function compareStyleGuides() {
  const testCases = [
    { bpm: 60, mood: 'calm', name: 'ambient_chill' },
    { bpm: 128, mood: 'energetic', name: 'dance_house' },
    { bpm: 170, mood: 'dark', name: 'drum_bass' }
  ];

  await fs.mkdir('./output/style-comparison', { recursive: true });

  for (const test of testCases) {
    console.log(`\nTesting: ${test.name} (${test.bpm} BPM, ${test.mood})`);
    const prompt = buildVisualizationPrompt(test.bpm, test.mood);
    console.log(`Prompt: ${prompt}\n`);

    // Generate with Gemini (fast)
    console.log('Generating with Gemini Nano Banana 2...');
    const geminiStart = Date.now();
    const geminiOutput = await geminiClient.generateImage(prompt, {
      // Gemini doesn't support resolution/aspect ratio params in generationConfig
      // Output is typically 1024x1024, will need post-processing for 16:9
    });
    const geminiTime = Date.now() - geminiStart;
    console.log(`✓ Gemini: ${geminiTime}ms`);

    // Generate with Flux (quality)
    console.log('Generating with Flux.2...');
    const fluxStart = Date.now();
    const fluxOutput = await fluxClient.generateWithReferences(prompt, [], {
      aspect_ratio: '16:9',
      width: 1920,  // Full HD for faster testing (use 3840 for 4K)
      output_format: 'png',
      output_quality: 100
    });
    const fluxTime = Date.now() - fluxStart;
    console.log(`✓ Flux: ${fluxTime}ms`);

    // Save both for comparison
    const geminiBuffer = Buffer.from(geminiOutput[0].split(',')[1], 'base64');
    await fs.writeFile(`./output/style-comparison/${test.name}_gemini.png`, geminiBuffer);

    const fluxResponse = await fetch(fluxOutput[0]);
    const fluxBuffer = await fluxResponse.arrayBuffer();
    await fs.writeFile(`./output/style-comparison/${test.name}_flux.png`, Buffer.from(fluxBuffer));

    console.log(`Saved comparison to: ./output/style-comparison/${test.name}_*.png`);
  }

  console.log('\n✓ Style guide comparison complete!');
  console.log('Review images in ./output/style-comparison/ to choose preferred style');
}

compareStyleGuides().catch(console.error);
