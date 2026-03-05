import 'dotenv/config';
import { ReferenceManager } from '../lib/reference-manager.js';
import { FluxClient } from '../lib/flux-client.js';
import { RunwayClient } from '../lib/runway-client.js';
import fs from 'fs/promises';

const refManager = new ReferenceManager();
const fluxClient = new FluxClient(process.env.FLUX_API_KEY);
const runwayClient = new RunwayClient(process.env.RUNWAY_API_KEY);

async function generateCharacterAnimation() {
  const refSetId = 'hero_main_001';
  
  console.log('Step 1: Generating character variant with Flux...');
  const fluxOutput = await fluxClient.generateFromReferenceSet(
    refManager,
    `characters/${refSetId}`,
    'character walking through modern villa, natural lighting, cinematic',
    { width: 1344, height: 768 } // 16:9 for Runway
  );
  
  console.log('Flux output:', fluxOutput);
  
  console.log('\nStep 2: Animating with Runway...');
  const runwayOutput = await runwayClient.imageToVideo(
    fluxOutput[0], // First generated image
    'smooth walk forward, natural movement',
    { duration: 5 }
  );
  
  console.log('Runway output:', runwayOutput);
  console.log(`Credits used: ${runwayOutput.credits}`);
  
  // Download video
  const videoResponse = await fetch(runwayOutput.videoUrl);
  const videoBuffer = await videoResponse.arrayBuffer();
  await fs.writeFile('./output/character_walk.mp4', Buffer.from(videoBuffer));
  
  console.log('\nSaved to: ./output/character_walk.mp4');
}

generateCharacterAnimation().catch(console.error);
