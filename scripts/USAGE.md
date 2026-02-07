# Quick Start Guide

## First Time Setup

1. Install Python dependencies:
```bash
cd scripts
pip install -r requirements.txt
```

## Adding Images to Your Gallery

### Option 1: Optimize New Images (Recommended)

1. Place your original high-resolution images in `scripts/source_images/`
2. Run the optimization script:
```bash
cd scripts
python optimize_images.py
```
3. The script will:
   - Resize images to web-friendly dimensions (max 1920px wide)
   - Compress them to reduce file size
   - Save optimized images to `public/images/`
   - Auto-generate `public/images/gallery.json`
4. Your gallery will automatically show the new images!

### Option 2: Use Already Optimized Images

If your images are already web-optimized, you can:
1. Copy them directly to `public/images/`
2. Run the script with your images folder:
```bash
python optimize_images.py --source ../public/images --output ../public/images
```
This will just generate the `gallery.json` file without reprocessing.

## Customization

### Adjust Image Quality/Size
```bash
# Smaller images, better quality
python optimize_images.py --max-width 1600 --quality 90

# Larger images, more compression
python optimize_images.py --max-width 2400 --quality 75
```

### Use Different Folders
```bash
python optimize_images.py --source ~/Pictures/wedding --output ../public/images
```

## Tips

- **Quality:** 85 is a good balance. Use 90+ for important photos, 70-80 for casual shots
- **Max width:** 1920px works well for most screens. Use 1600px for faster loading
- **File size:** Aim for 100-300KB per image for good performance
- The script shows you size reduction for each image

## How the Gallery Works

The gallery component (`src/pages/gallery.tsx`) automatically:
1. Loads images from `public/images/gallery.json`
2. Falls back to default images if the JSON file doesn't exist
3. Uses lazy loading for better performance

Simply run the optimization script whenever you want to add or update gallery images!
