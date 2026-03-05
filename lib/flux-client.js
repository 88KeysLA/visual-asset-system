import fs from 'fs/promises';

export class FluxClient {
  constructor(apiKey, provider = 'replicate') {
    this.apiKey = apiKey;
    this.provider = provider;
    this.baseUrl = provider === 'replicate' 
      ? 'https://api.replicate.com/v1'
      : 'https://api.bfl.ml/v1'; // Black Forest Labs direct
  }

  async generateWithReferences(prompt, referenceImages, params = {}) {
    const defaults = {
      guidance: 3.5,
      num_outputs: 1,
      aspect_ratio: '1:1',
      output_format: 'png',
      output_quality: 100,
      safety_tolerance: 2
    };

    const input = {
      prompt,
      ...defaults,
      ...params
    };

    // Add reference images if provided (max 8)
    if (referenceImages && referenceImages.length > 0) {
      referenceImages.slice(0, 8).forEach((img, i) => {
        input[`reference_image_${i + 1}`] = img;
      });
    }

    const body = {
      version: 'black-forest-labs/flux-2-pro',
      input
    };

    const response = await fetch(`${this.baseUrl}/predictions`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${this.apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Flux API error: ${error}`);
    }

    const prediction = await response.json();
    return this.waitForCompletion(prediction.id);
  }

  async waitForCompletion(predictionId, maxWait = 300000) {
    const start = Date.now();
    
    while (Date.now() - start < maxWait) {
      const response = await fetch(`${this.baseUrl}/predictions/${predictionId}`, {
        headers: { 'Authorization': `Token ${this.apiKey}` }
      });
      
      const prediction = await response.json();
      
      if (prediction.status === 'succeeded') {
        // Return array of output URLs
        return Array.isArray(prediction.output) ? prediction.output : [prediction.output];
      }
      
      if (prediction.status === 'failed') {
        throw new Error(`Generation failed: ${prediction.error}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    throw new Error('Generation timeout');
  }

  async generateFromReferenceSet(refManager, refSetId, prompt, params = {}) {
    const refSet = await refManager.getSet(refSetId.split('_')[0], refSetId);
    
    // Convert local paths to base64 (max 8 for Flux 2 Pro)
    const referenceImages = await Promise.all(
      refSet.images.slice(0, 8).map(async (imgPath) => {
        const buffer = await fs.readFile(imgPath);
        return `data:image/png;base64,${buffer.toString('base64')}`;
      })
    );

    const mergedParams = {
      ...refSet.metadata.flux_params,
      ...params
    };

    return this.generateWithReferences(prompt, referenceImages, mergedParams);
  }
}
