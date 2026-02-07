# Image Optimization Scripts

This folder contains scripts to prepare images for the web gallery.

## Setup

Install required Python packages:

```bash
pip install -r requirements.txt
```

## Usage

### optimize_images.py

Optimizes JPG images for web use by resizing and compressing them.

**Basic usage:**

1. Create a `source_images` folder in the scripts directory
2. Add your original high-resolution images to `source_images/`
3. Run the script:

```bash
python optimize_images.py
```

This will:
- Resize images to max 1920px width (maintaining aspect ratio)
- Compress to 85% quality
- Save optimized images to `public/images/`
- Generate `public/images/gallery.json` with image metadata

**Custom options:**

```bash
# Specify custom directories
python optimize_images.py --source ./my_photos --output ../public/images

# Adjust quality and size
python optimize_images.py --max-width 1600 --quality 90

# Full example
python optimize_images.py \
  --source ./source_images \
  --output ../public/images \
  --max-width 1920 \
  --quality 85
```

**Parameters:**
- `--source`: Source directory with original images (default: `./source_images`)
- `--output`: Output directory for optimized images (default: `../public/images`)
- `--max-width`: Maximum width in pixels (default: 1920)
- `--quality`: JPEG quality 1-100 (default: 85)

## Workflow

1. Place original images in `scripts/source_images/`
2. Run `python optimize_images.py`
3. Optimized images are saved to `public/images/`
4. The gallery automatically loads from `gallery.json`
