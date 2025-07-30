#!/bin/bash

SRC_DIR="$1"
OUT_DIR="$2"

# ✅ Check input arguments
if [ -z "$SRC_DIR" ] || [ -z "$OUT_DIR" ]; then
  echo "Usage: $0 <src_dir> <out_dir>"
  exit 1
fi

# Ensure ImageMagick is available
command -v magick >/dev/null 2>&1 || {
  echo "ImageMagick's 'magick' CLI not found. Please install it first."
  exit 1
}

mkdir -p "$OUT_DIR"

# Supported extensions
shopt -s nullglob
for img in "$SRC_DIR"/*.{png,jpg,jpeg,webp}; do
  [ -f "$img" ] || continue

  base=$(basename "${img%.*}")
  size=$(identify -format "%[fx:max(w,h)]x%[fx:max(w,h)]" "$img")
  output="$OUT_DIR/$base.webp"

  echo "📦 Converting $img → $output"
  magick "$img" -gravity center -background none -extent "$size" "$output"
done

