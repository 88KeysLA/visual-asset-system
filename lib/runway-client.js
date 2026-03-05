import fs from 'fs/promises';

export class RunwayClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.dev.runwayml.com/v1';
  }

  async imageToVideo(imageUrl, prompt, params = {}) {
    const body = {
      promptImage: imageUrl,
      promptText: prompt,
      model: params.model || 'gen4.5',
      duration: params.duration || 5,
      ratio: params.ratio || '1280:720'
    };

    console.log('DEBUG: Runway request body:', JSON.stringify(body, null, 2));

    const response = await fetch(`${this.baseUrl}/image_to_video`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'X-Runway-Version': '2024-11-06',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Runway API error: ${error}`);
    }

    const task = await response.json();
    return this.waitForCompletion(task.id);
  }

  async textToVideo(prompt, params = {}) {
    const body = {
      promptText: prompt,
      model: params.model || 'gen4.5',
      duration: params.duration || 5,
      ratio: params.ratio || '1280:720'
    };

    const response = await fetch(`${this.baseUrl}/text_to_video`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
        'X-Runway-Version': '2024-11-06',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Runway API error: ${error}`);
    }

    const task = await response.json();
    return this.waitForCompletion(task.id);
  }

  async waitForCompletion(taskId, maxWait = 600000) {
    const start = Date.now();
    
    while (Date.now() - start < maxWait) {
      const response = await fetch(`${this.baseUrl}/tasks/${taskId}`, {
        headers: {
          'Authorization': `Bearer ${this.apiKey}`,
          'X-Runway-Version': '2024-11-06'
        }
      });
      
      const task = await response.json();
      
      if (task.status === 'SUCCEEDED') {
        return {
          videoUrl: task.output[0],
          credits: task.credits_used
        };
      }
      
      if (task.status === 'FAILED') {
        throw new Error(`Video generation failed: ${task.failure}`);
      }
      
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
    
    throw new Error('Video generation timeout');
  }

  async animateReferenceSet(refManager, refSetId, prompt, params = {}) {
    const refSet = await refManager.getSet(refSetId.split('_')[0], refSetId);
    
    // Use first image from reference set as base
    const baseImage = refSet.images[0];
    const buffer = await fs.readFile(baseImage);
    const imageUrl = `data:image/png;base64,${buffer.toString('base64')}`;

    const mergedParams = {
      ...refSet.metadata.runway_params,
      ...params
    };

    return this.imageToVideo(imageUrl, prompt, mergedParams);
  }
}
