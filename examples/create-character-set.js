import { ReferenceManager } from '../lib/reference-manager.js';

const refManager = new ReferenceManager();

// Example: Create a character reference set
async function createHeroCharacter() {
  const setPath = await refManager.createSet('characters', 'hero_main_001', {
    tags: ['male', '30s', 'casual', 'protagonist'],
    style: 'photorealistic',
    flux_params: {
      model: 'flux-2-pro',
      guidance: 3.5,
      steps: 50
    },
    notes: 'Main character for villa interface - friendly, approachable'
  });
  
  console.log(`Created reference set at: ${setPath}`);
  console.log('Next: Add 10 reference images to this directory');
  console.log('Then use this set ID in Flux multi-reference calls');
}

// Example: Search for existing sets
async function findStyleSets() {
  const results = await refManager.search('photorealistic');
  console.log('Found reference sets:', results);
}

// Run example
createHeroCharacter();
