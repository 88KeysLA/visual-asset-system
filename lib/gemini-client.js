export class GeminiClient {
  constructor(apiKey) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
  }

  async generateImage(prompt, params = {}) {
    const model = 'gemini-3.1-flash-image-preview';
    
    const body = {
      contents: [{
        parts: [{
          text: prompt
        }]
      }],
      generationConfig: {
        temperature: params.temperature || 1.0,
        topP: params.topP || 0.95,
        topK: params.topK || 40
      }
    };

    const response = await fetch(
      `${this.baseUrl}/models/${model}:generateContent?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error: ${error}`);
    }

    const result = await response.json();
    
    // Extract image data from response
    const images = result.candidates[0].content.parts
      .filter(part => part.inlineData)
      .map(part => `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
    
    return images;
  }

  async generateWithReferences(prompt, referenceImages, params = {}) {
    // Gemini supports up to 5 reference images
    const parts = [{ text: prompt }];
    
    for (const imgUrl of referenceImages.slice(0, 5)) {
      if (imgUrl.startsWith('data:')) {
        const [header, base64] = imgUrl.split(',');
        const mimeType = header.match(/data:(.*);base64/)[1];
        parts.push({
          inlineData: {
            mimeType,
            data: base64
          }
        });
      }
    }

    const body = {
      contents: [{ parts }],
      generationConfig: {
        temperature: params.temperature || 1.0,
        topP: params.topP || 0.95,
        topK: params.topK || 40
      }
    };

    const response = await fetch(
      `${this.baseUrl}/models/gemini-3.1-flash-image-preview:generateContent?key=${this.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const result = await response.json();
    const images = result.candidates[0].content.parts
      .filter(part => part.inlineData)
      .map(part => `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`);
    
    return images;
  }

  async generateFromReferenceSet(refManager, refSetId, prompt, params = {}) {
    const refSet = await refManager.getSet(refSetId.split('_')[0], refSetId);
    
    const referenceImages = await Promise.all(
      refSet.images.slice(0, 5).map(async (imgPath) => {
        const buffer = await import('fs/promises').then(fs => fs.readFile(imgPath));
        return `data:image/png;base64,${buffer.toString('base64')}`;
      })
    );

    const mergedParams = {
      ...refSet.metadata.gemini_params,
      ...params
    };

    return this.generateWithReferences(prompt, referenceImages, mergedParams);
  }
}
