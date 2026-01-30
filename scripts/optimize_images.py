#!/usr/bin/env python3
"""
Image optimization script for web gallery.
Resizes and compresses JPG images to be web-friendly.

Usage:
    python optimize_images.py [--source SOURCE_DIR] [--output OUTPUT_DIR] [--max-width MAX_WIDTH] [--quality QUALITY]

Examples:
    python optimize_images.py
    python optimize_images.py --source ./originals --output ../public/images --max-width 1920 --quality 85
"""

import os
import sys
import json
import argparse
from pathlib import Path
from PIL import Image
from datetime import datetime


def optimize_image(input_path, output_path, max_width=1920, quality=85):
    """
    Optimize a single image by resizing and compressing it.

    Args:
        input_path: Path to the source image
        output_path: Path where optimized image will be saved
        max_width: Maximum width in pixels (maintains aspect ratio)
        quality: JPEG quality (1-100, higher is better)

    Returns:
        dict: Statistics about the optimization
    """
    try:
        with Image.open(input_path) as img:
            # Convert to RGB if necessary (handles RGBA, P, etc.)
            if img.mode != 'RGB':
                img = img.convert('RGB')

            original_size = os.path.getsize(input_path)
            width, height = img.size

            # Calculate new dimensions if image is wider than max_width
            if width > max_width:
                ratio = max_width / width
                new_width = max_width
                new_height = int(height * ratio)
                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)

            # Save optimized image
            img.save(output_path, 'JPEG', quality=quality, optimize=True)

            new_size = os.path.getsize(output_path)
            reduction = ((original_size - new_size) / original_size) * 100

            return {
                'filename': os.path.basename(output_path),
                'original_size': original_size,
                'new_size': new_size,
                'reduction_percent': round(reduction, 2),
                'dimensions': f"{img.size[0]}x{img.size[1]}"
            }
    except Exception as e:
        print(f"Error processing {input_path}: {e}")
        return None


def process_directory(source_dir, output_dir, max_width=1920, quality=85):
    """
    Process all JPG images in a directory.

    Args:
        source_dir: Directory containing source images
        output_dir: Directory where optimized images will be saved
        max_width: Maximum width in pixels
        quality: JPEG quality (1-100)

    Returns:
        list: Gallery metadata for all processed images
    """
    source_path = Path(source_dir)
    output_path = Path(output_dir)

    # Create output directory if it doesn't exist
    output_path.mkdir(parents=True, exist_ok=True)

    # Supported image extensions
    extensions = {'.jpg', '.jpeg', '.JPG', '.JPEG'}

    # Find all image files
    image_files = [f for f in source_path.iterdir()
                   if f.is_file() and f.suffix in extensions]

    if not image_files:
        print(f"No JPG images found in {source_dir}")
        return []

    print(f"Found {len(image_files)} images to process")
    print(f"Max width: {max_width}px, Quality: {quality}%")
    print("-" * 60)

    gallery_images = []
    total_original = 0
    total_new = 0

    for img_file in sorted(image_files):
        output_file = output_path / f"{img_file.stem}.jpg"
        print(f"Processing: {img_file.name}...", end=' ')

        result = optimize_image(img_file, output_file, max_width, quality)

        if result:
            total_original += result['original_size']
            total_new += result['new_size']

            print(f"✓ {result['dimensions']} "
                  f"({result['original_size']//1024}KB → {result['new_size']//1024}KB, "
                  f"-{result['reduction_percent']}%)")

            # Add to gallery metadata
            gallery_images.append({
                'filename': result['filename'],
                'path': f"/images/{result['filename']}",
                'alt': f"Gallery image {len(gallery_images) + 1}"
            })
        else:
            print("✗ Failed")

    print("-" * 60)
    total_reduction = ((total_original - total_new) / total_original) * 100 if total_original > 0 else 0
    print(f"Total: {total_original//1024}KB → {total_new//1024}KB "
          f"({total_reduction:.1f}% reduction)")

    return gallery_images


def generate_gallery_json(gallery_images, output_dir):
    """
    Generate a gallery.json file with metadata about all images.

    Args:
        gallery_images: List of image metadata dictionaries
        output_dir: Directory where gallery.json will be saved
    """
    gallery_data = {
        'generated': datetime.now().isoformat(),
        'images': gallery_images
    }

    gallery_json_path = Path(output_dir) / 'gallery.json'
    with open(gallery_json_path, 'w') as f:
        json.dump(gallery_data, f, indent=2)

    print(f"\nGallery metadata saved to: {gallery_json_path}")


def main():
    parser = argparse.ArgumentParser(
        description='Optimize JPG images for web gallery',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Process images in current directory
  python optimize_images.py

  # Specify source and output directories
  python optimize_images.py --source ./originals --output ../public/images

  # Adjust quality and max width
  python optimize_images.py --max-width 1600 --quality 90
        """
    )

    parser.add_argument(
        '--source',
        default='./source_images',
        help='Source directory containing original images (default: ./source_images)'
    )

    parser.add_argument(
        '--output',
        default='../public/images',
        help='Output directory for optimized images (default: ../public/images)'
    )

    parser.add_argument(
        '--max-width',
        type=int,
        default=1920,
        help='Maximum width in pixels (default: 1920)'
    )

    parser.add_argument(
        '--quality',
        type=int,
        default=85,
        help='JPEG quality 1-100 (default: 85)'
    )

    args = parser.parse_args()

    # Validate quality
    if not 1 <= args.quality <= 100:
        print("Error: Quality must be between 1 and 100")
        sys.exit(1)

    # Check if source directory exists
    if not os.path.exists(args.source):
        print(f"Error: Source directory '{args.source}' not found")
        print(f"Create it and add your original images there, or specify a different path with --source")
        sys.exit(1)

    print(f"Source: {args.source}")
    print(f"Output: {args.output}")
    print()

    # Process images
    gallery_images = process_directory(
        args.source,
        args.output,
        args.max_width,
        args.quality
    )

    if gallery_images:
        # Generate gallery.json
        generate_gallery_json(gallery_images, args.output)
        print(f"\n✓ Successfully processed {len(gallery_images)} images")
    else:
        print("\nNo images were processed")
        sys.exit(1)


if __name__ == '__main__':
    main()
