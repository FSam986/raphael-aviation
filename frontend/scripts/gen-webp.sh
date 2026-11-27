#!/bin/sh
# Make a .webp next to every figure PNG/JPG that lacks one (run after adding images).
# Needs cwebp (brew install webp).
cd "$(dirname "$0")/../public/figures" || exit 1
find . -type f \( -name "*.png" -o -name "*.jpg" \) -print0 |
  xargs -0 -P 8 -I{} sh -c 'o="${1%.*}.webp"; [ -f "$o" ] || cwebp -quiet -q 85 -m 6 "$1" -o "$o"' _ {}
