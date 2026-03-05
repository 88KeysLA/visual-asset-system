# Visual Asset Reference Library

## Structure

```
reference-library/
├── characters/          # Character identity sets (10 images each)
├── styles/             # Visual style references
├── products/           # Product/object consistency sets
├── environments/       # Location/scene references
├── lighting/           # Lighting preset references
└── compositions/       # Layout/framing templates
```

## Reference Set Format

Each reference set is a directory containing:
- 10 reference images (PNG/JPG)
- metadata.json (tags, usage notes, generation params)
- prompt-template.txt (reusable prompt structure)

## Usage

1. Create reference set for new character/style/product
2. Tag with searchable metadata
3. Use set ID in Flux.2 multi-reference calls
4. Feed best outputs to Runway for animation

## Metadata Schema

```json
{
  "id": "char_hero_001",
  "type": "character",
  "tags": ["male", "30s", "casual", "protagonist"],
  "style": "photorealistic",
  "created": "2026-03-04",
  "flux_params": {
    "model": "flux-2-pro",
    "guidance": 3.5
  },
  "notes": "Main character for villa interface animations"
}
```
