# Visual Asset System - API Setup

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure API keys:**
   ```bash
   cp .env.example .env
   # Edit .env with your keys
   ```

3. **Get API keys:**
   - **Runway:** https://app.runwayml.com/settings/api (you already have Pro account)
   - **Flux:** Choose one:
     - Replicate: https://replicate.com/account/api-tokens
     - Black Forest Labs direct: https://api.bfl.ml

## Usage

### Generate with Flux (multi-reference consistency)
```javascript
import { FluxClient } from './lib/flux-client.js';
import { ReferenceManager } from './lib/reference-manager.js';

const flux = new FluxClient(process.env.FLUX_API_KEY);
const refManager = new ReferenceManager();

const output = await flux.generateFromReferenceSet(
  refManager,
  'characters/hero_main_001',
  'character in villa, morning light',
  { width: 1024, height: 1024 }
);
```

### Animate with Runway
```javascript
import { RunwayClient } from './lib/runway-client.js';

const runway = new RunwayClient(process.env.RUNWAY_API_KEY);

const video = await runway.imageToVideo(
  imageUrl,
  'smooth camera pan',
  { duration: 5, model: 'gen4.5' }
);
```

### Full Pipeline (Flux → Runway)
```bash
npm run example:animation
```

## API Costs

- **Flux:** ~$0.04 per image (Replicate pricing)
- **Runway Gen-4.5:** ~5-10 credits per video ($0.05-0.10)
- **Batch generation:** Queue overnight for cost efficiency

## Integration with Villa Portal

Add to your existing Express app:
```javascript
import { FluxClient } from './visual-asset-system/lib/flux-client.js';
app.post('/api/visual/generate', async (req, res) => {
  const { refSetId, prompt } = req.body;
  const output = await fluxClient.generateFromReferenceSet(...);
  res.json({ output });
});
```
