import 'dotenv/config';
import { RunwayClient } from '../lib/runway-client.js';
import { FluxClient } from '../lib/flux-client.js';
import fs from 'fs/promises';

const runwayClient = new RunwayClient(process.env.RUNWAY_API_KEY);
const fluxClient = new FluxClient(process.env.FLUX_API_KEY);

async function quickTest() {
  console.log('Testing Flux + Runway pipeline (no reference set needed)\n');
  
  // Step 1: Generate image with Flux
  console.log('Step 1: Generating image with Flux...');
  const fluxOutput = await fluxClient.generateWithReferences(
    'modern villa interior, floor-to-ceiling windows, morning sunlight, minimalist furniture, photorealistic',
    [], // No references for quick test
    { 
      width: 1344, 
      height: 768,
      num_inference_steps: 30 // Faster for testing
    }
  );
  
  console.log('✓ Flux generated:', fluxOutput[0]);
  
  // Step 2: Animate with Runway
  console.log('\nStep 2: Animating with Runway Gen-4.5...');
  const runwayOutput = await runwayClient.imageToVideo(
    fluxOutput[0],
    'slow camera dolly forward, cinematic movement',
    { duration: 5 }
  );
  
  console.log('✓ Runway generated:', runwayOutput.videoUrl);
  console.log(`  Credits used: ${runwayOutput.credits}`);
  
  // Download video
  await fs.mkdir('./output', { recursive: true });
  const videoResponse = await fetch(runwayOutput.videoUrl);
  const videoBuffer = await videoResponse.arrayBuffer();
  await fs.writeFile('./output/test_villa.mp4', Buffer.from(videoBuffer));
  
  console.log('\n✓ Saved to: ./output/test_villa.mp4');
  console.log('\nPipeline working! Next: Create reference sets for consistency.');
}

quickTest().catch(console.error);
