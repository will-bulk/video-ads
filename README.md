# BulkLoads Testimonial Video Ads

Remotion-based vertical video ads (1080x1920) for BulkLoads.com testimonials.

## Setup

```bash
npm install
```

## Download Source Videos

```bash
# Install yt-dlp if needed: brew install yt-dlp
yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]" -o "public/%(id)s.mp4" \
  "https://youtu.be/56YATPH7Yo0" \
  "https://youtu.be/Qf7mrGiq4Ag" \
  "https://youtu.be/4ftIJGv8rU4" \
  "https://youtu.be/eMo7QZA8KUs"
```

## Preview in Remotion Studio

```bash
npx remotion studio
```

## Render

```bash
npx remotion render TrucksGrowthV3 out/trucks-growth-v3.mp4
```

## Videos

| ID | Composition | Source |
|----|------------|--------|
| trucks-growth-v3 | `TrucksGrowthV3` | 56YATPH7Yo0 (2→14 Trucks) |

## Export for Premiere Pro

Rendered MP4s (H.264) import directly into Premiere Pro. For lossless:

```bash
npx remotion render TrucksGrowthV3 out/trucks-growth-v3.mov --codec=prores
```
