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

# Get all video IDs from the config
IDS=$(node -e "
  const {videos} = require('./src/videos.config');
  videos.forEach(v => console.log(v.id));
" 2>/dev/null)

if [ -z "$IDS" ]; then
  echo "❌ Could not read video config. Make sure you ran 'npm install' first."
  echo ""
  read -p "Press Enter to close..."
  exit 1
fi

COUNT=0
TOTAL=$(echo "$IDS" | wc -l | tr -d ' ')

echo "$IDS" | while read -r id; do
  COUNT=$((COUNT + 1))
  echo "[$COUNT/$TOTAL] Rendering: $id"
  echo "         → out/${id}.mov (ProRes 422)"
  npx remotion render "$id" "out/${id}.mov" --codec=prores 2>&1 | grep -E "^(Rendered|Error)"
  echo ""
done

echo "════════════════════════════════════════════════════════"
echo "✅ Done! Your files are in the 'out' folder."
echo ""
echo "📂 Opening output folder..."
open out/

read -p "Press Enter to close..."
