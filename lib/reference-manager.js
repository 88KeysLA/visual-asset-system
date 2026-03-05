import fs from 'fs/promises';
import path from 'path';

const REF_BASE = './reference-library';

export class ReferenceManager {
  async createSet(type, id, metadata) {
    const setPath = path.join(REF_BASE, type, id);
    await fs.mkdir(setPath, { recursive: true });
    
    const meta = {
      id,
      type,
      created: new Date().toISOString().split('T')[0],
      ...metadata
    };
    
    await fs.writeFile(
      path.join(setPath, 'metadata.json'),
      JSON.stringify(meta, null, 2)
    );
    
    return setPath;
  }

  async getSet(type, id) {
    const setPath = path.join(REF_BASE, type, id);
    const metaPath = path.join(setPath, 'metadata.json');
    
    const metadata = JSON.parse(await fs.readFile(metaPath, 'utf8'));
    const files = await fs.readdir(setPath);
    const images = files.filter(f => /\.(png|jpg|jpeg)$/i.test(f));
    
    return {
      metadata,
      images: images.map(f => path.join(setPath, f)),
      path: setPath
    };
  }

  async search(query) {
    const results = [];
    const types = await fs.readdir(REF_BASE);
    
    for (const type of types) {
      const typePath = path.join(REF_BASE, type);
      const stat = await fs.stat(typePath);
      if (!stat.isDirectory()) continue;
      
      const sets = await fs.readdir(typePath);
      for (const setId of sets) {
        const metaPath = path.join(typePath, setId, 'metadata.json');
        try {
          const meta = JSON.parse(await fs.readFile(metaPath, 'utf8'));
          const searchStr = JSON.stringify(meta).toLowerCase();
          if (searchStr.includes(query.toLowerCase())) {
            results.push(meta);
          }
        } catch {}
      }
    }
    
    return results;
  }

  async addImages(type, id, imagePaths) {
    const setPath = path.join(REF_BASE, type, id);
    const added = [];
    
    for (const imgPath of imagePaths) {
      const filename = path.basename(imgPath);
      const destPath = path.join(setPath, filename);
      await fs.copyFile(imgPath, destPath);
      added.push(destPath);
    }
    
    return added;
  }
}
