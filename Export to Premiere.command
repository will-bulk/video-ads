#!/bin/bash
# ═══════════════════════════════════════════════════
# 🎬 Export All Videos for Premiere Pro
# Just double-click this file to render all videos!
# ═══════════════════════════════════════════════════

cd "$(dirname "$0")"

echo ""
echo "🎬 BulkLoads Video Ads — Exporting for Premiere Pro..."
echo "════════════════════════════════════════════════════════"
echo ""

# Create output folder
mkdir -p out

# Get all video IDs from the config using npx tsx
IDS=$(npx tsx -e "
  import {videos} from './src/videos.config';
  videos.forEach(v => console.log(v.id));
" 2>/dev/null)

if [ -z "$IDS" ]; then
  echo "❌ Could not read video config."
  echo "   Trying to install dependencies..."
  npm install
  IDS=$(npx tsx -e "
    import {videos} from './src/videos.config';
    videos.forEach(v => console.log(v.id));
  " 2>/dev/null)
fi

if [ -z "$IDS" ]; then
  echo "❌ Still can't read config. Ask BulkBot or William for help."
  echo ""
  read -p "Press Enter to close..."
  exit 1
fi

COUNT=0
TOTAL=$(echo "$IDS" | wc -l | tr -d ' ')

echo "Found $TOTAL video(s) to export."
echo ""

echo "$IDS" | while read -r id; do
  COUNT=$((COUNT + 1))
  echo "[$COUNT/$TOTAL] Rendering: $id"
  echo "         → out/${id}.mov (ProRes 422)"
  npx remotion render "$id" "out/${id}.mov" --codec=prores 2>&1 | tail -3
  echo ""
done

echo "════════════════════════════════════════════════════════"
echo "✅ Done! Your files are in the 'out' folder."
echo ""
echo "📂 Opening output folder..."
open out/

read -p "Press Enter to close..."
