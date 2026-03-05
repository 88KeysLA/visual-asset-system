import 'dotenv/config';
import { GeminiClient } from '../lib/gemini-client.js';
import { RunwayClient } from '../lib/runway-client.js';
import { CreditTracker } from '../lib/credit-tracker.js';
import fs from 'fs/promises';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);
const geminiClient = new GeminiClient(process.env.GEMINI_API_KEY);
const runwayClient = new RunwayClient(process.env.RUNWAY_API_KEY);

// Calculate BPM-synced animation timing
function calculateBPMTiming(bpm, targetBeats = 10) {
  const beatsPerSecond = bpm / 60;
  const secondsPerBeat = 60 / bpm;
  const targetDuration = (targetBeats / bpm) * 60;
  const stretchRatio = targetDuration / 5.0;
  
  return {
    bpm,
    beatsPerSecond: beatsPerSecond.toFixed(2),
    secondsPerBeat: secondsPerBeat.toFixed(3),
    targetBeats,
    targetDuration: targetDuration.toFixed(2),
    stretchRatio: stretchRatio.toFixed(3),
    baseDuration: 5
  };
}

// Music visualization prompt builder
function buildVisualizationPrompt(bpm, mood) {
  const bpmStyles = {
    slow: { range: [40, 80], motion: 'gentle flowing waves', colors: 'cool blue and purple gradient', lighting: 'soft diffused', speed: 'slow motion' },
    moderate: { range: [80, 120], motion: 'steady rhythmic pulse', colors: 'balanced warm tones', lighting: 'natural even', speed: 'normal speed' },
    upbeat: { range: [120, 140], motion: 'pulsing geometric patterns', colors: 'vibrant neon', lighting: 'strobing synchronized', speed: 'energetic pace' },
    fast: { range: [140, 180], motion: 'rapid particle explosions', colors: 'electric neon', lighting: 'intense strobe', speed: 'fast motion' },
    veryFast: { range: [180, 999], motion: 'chaotic blur effects', colors: 'extreme contrast', lighting: 'harsh industrial', speed: 'very fast motion' }
  };

  const moodStyles = {
    happy: 'joyful, bright sunlight, warm colors, uplifting motion',
    sad: 'melancholic, rain-soaked, cool tones, slow fade, isolated',
    energetic: 'explosive energy, vibrant colors, rapid motion, electric',
    calm: 'serene, gentle breeze, soft lighting, peaceful flow',
    dark: 'dark atmosphere, intense shadows, dramatic lighting, ominous',
    mysterious: 'ethereal mist, mysterious glow, floating particles, otherworldly'
  };

  let bpmStyle = bpmStyles.moderate;
  for (const [key, style] of Object.entries(bpmStyles)) {
    if (bpm >= style.range[0] && bpm < style.range[1]) {
      bpmStyle = style;
      break;
    }
  }

  const moodDesc = moodStyles[mood.toLowerCase()] || moodStyles.calm;

  return {
    image: `${moodDesc} music visualization, ${bpm} BPM tempo, ${bpmStyle.colors}, ${bpmStyle.motion}, ${bpmStyle.lighting}, cinematic, 4K, photorealistic, 16:9 widescreen`,
    video: `${bpmStyle.motion}, ${bpmStyle.speed}, ${moodDesc} movement, rhythmic pulsing`
  };
}

async function timeStretchVideo(inputPath, outputPath, ratio) {
  const fps = 30;
  const newPTS = 1 / ratio;
  
  const cmd = `ffmpeg -i "${inputPath}" -filter:v "setpts=${newPTS}*PTS" -r ${fps} -y "${outputPath}"`;
  
  try {
    await execAsync(cmd);
    return true;
  } catch (err) {
    console.error('FFmpeg error:', err.message);
    return false;
  }
}

async function generateMusicVisualization(bpm, mood, outputName) {
  console.log(`\n🎵 Generating BPM-synced visualization: ${outputName}`);
  console.log(`   BPM: ${bpm} | Mood: ${mood}\n`);

  // Check credits
  const tracker = new CreditTracker();
  const runwayCredits = await tracker.checkRunway(process.env.RUNWAY_API_KEY);
  if (runwayCredits !== null) {
    console.log(`💰 Runway Credits: ${runwayCredits}`);
    if (runwayCredits < 5) {
      console.warn(`⚠️  Low credits! Only ${runwayCredits} remaining`);
    }
  }

  const timing = calculateBPMTiming(bpm);
  const prompts = buildVisualizationPrompt(bpm, mood);
  
  console.log(`⏱️  BPM Timing:`);
  console.log(`   ${timing.beatsPerSecond} beats/second`);
  console.log(`   ${timing.secondsPerBeat}s per beat`);
  console.log(`   Target: ${timing.targetBeats} beats in ${timing.targetDuration}s`);
  console.log(`   Stretch ratio: ${timing.stretchRatio}x\n`);
  
  // Step 1: Generate static image with Gemini
  console.log('Step 1/4: Generating image with Gemini...');
  const imageStart = Date.now();
  const geminiOutput = await geminiClient.generateImage(prompts.image);
  const imageTime = ((Date.now() - imageStart) / 1000).toFixed(1);
  console.log(`✓ Image generated in ${imageTime}s`);

  // Save image locally first
  await fs.mkdir('./output/production', { recursive: true });
  const imageBuffer = Buffer.from(geminiOutput[0].split(',')[1], 'base64');
  const imagePath = `./output/production/${outputName}_image.png`;
  await fs.writeFile(imagePath, imageBuffer);
  console.log(`✓ Saved: ${imagePath}`);

  // Step 2: Animate with Runway
  console.log('\nStep 2/4: Animating with Runway Gen-4.5...');
  const videoStart = Date.now();
  const runwayOutput = await runwayClient.imageToVideo(
    geminiOutput[0],
    prompts.video,
    { duration: 5, model: 'gen4.5', ratio: '1280:720' }
  );
  const videoTime = ((Date.now() - videoStart) / 1000).toFixed(1);
  console.log(`✓ Video generated in ${videoTime}s`);
  console.log(`  Credits used: ${runwayOutput.credits}`);

  // Step 3: Download base video
  console.log('\nStep 3/4: Downloading base video...');
  const videoResponse = await fetch(runwayOutput.videoUrl);
  const videoBuffer = await videoResponse.arrayBuffer();
  const baseVideoPath = `./output/production/${outputName}_base.mp4`;
  await fs.writeFile(baseVideoPath, Buffer.from(videoBuffer));
  console.log(`✓ Saved: ${baseVideoPath}`);

  // Step 4: Time-stretch to exact BPM
  console.log('\nStep 4/4: Time-stretching to exact BPM...');
  const syncStart = Date.now();
  const syncedVideoPath = `./output/production/${outputName}_video.mp4`;
  const success = await timeStretchVideo(baseVideoPath, syncedVideoPath, parseFloat(timing.stretchRatio));
  const syncTime = ((Date.now() - syncStart) / 1000).toFixed(1);
  
  if (success) {
    console.log(`✓ BPM-synced video in ${syncTime}s`);
    console.log(`✓ Saved: ${syncedVideoPath}`);
    // Clean up base video
    await fs.unlink(baseVideoPath);
  } else {
    console.log(`⚠️  FFmpeg failed, using base video`);
    await fs.rename(baseVideoPath, syncedVideoPath);
  }

  const totalTime = ((Date.now() - imageStart) / 1000).toFixed(1);
  console.log(`\n✅ Complete in ${totalTime}s total`);
  console.log(`   Cost: ~$${(runwayOutput.credits * 0.01).toFixed(2)} (Runway credits only)\n`);

  return {
    imagePath,
    videoPath: syncedVideoPath,
    credits: runwayOutput.credits,
    timing,
    timings: {
      image: imageTime,
      video: videoTime,
      sync: syncTime,
      total: totalTime
    }
  };
}

// CLI usage
const args = process.argv.slice(2);
if (args.length < 3) {
  console.log('Usage: node production-pipeline.js <bpm> <mood> <output-name>');
  console.log('Example: node production-pipeline.js 128 energetic dance_track');
  console.log('\nMoods: happy, sad, energetic, calm, dark, mysterious');
  console.log('\nRequires: FFmpeg installed (brew install ffmpeg)');
  process.exit(1);
}

const [bpm, mood, outputName] = args;
generateMusicVisualization(parseInt(bpm), mood, outputName).catch(console.error);
