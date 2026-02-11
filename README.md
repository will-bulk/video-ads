# 🎬 BulkLoads Video Ads

Short testimonial video ads for social media (Instagram Reels, TikTok, Facebook).

## 🚀 First-Time Setup (one time only)

### 1. Install the tools
Open **Terminal** (search for "Terminal" in Spotlight) and paste these one at a time:

```bash
# Install Homebrew (if you don't have it)
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Node.js and yt-dlp
brew install node yt-dlp
```

### 2. Download this project
```bash
cd ~/Desktop
git clone https://github.com/will-bulk/video-ads.git
cd video-ads
npm install
```

### 3. Download the source videos
```bash
yt-dlp -f "bestvideo[ext=mp4]+bestaudio[ext=m4a]/best[ext=mp4]" -o "public/%(id)s.mp4" \
  "https://youtu.be/56YATPH7Yo0" \
  "https://youtu.be/Qf7mrGiq4Ag" \
  "https://youtu.be/4ftIJGv8rU4"
```

---

## ✏️ How to Edit Videos

### Open the editor
```bash
cd ~/Desktop/video-ads
npx remotion studio
```
This opens a browser window where you can **preview videos in real-time**.

### Edit the text and settings
Open this file in any text editor (TextEdit, VS Code, etc.):

```
src/videos.config.ts
```

**That's the only file you need to touch!** It looks like this:

```
{
  id: "trucks-growth",
  videoFile: "56YATPH7Yo0.mp4",
  quote: "We have 14 trucks. Six years ago we had two.",
  speaker: "Terry Catlett — Catlett Trucking",
  ctaText: "Sign Up Free → bulkloads.com",
  startAt: 36,
  duration: 14,
  accentColor: "#E8A000",
}
```

**What you can change:**
| Field | What it does | Example |
|-------|-------------|---------|
| `quote` | The big text quote on screen | `"Best load board ever"` |
| `speaker` | Name shown below the quote | `"John Smith — ABC Trucking"` |
| `ctaText` | The button text at the bottom | `"Try Free → bulkloads.com"` |
| `startAt` | Where in the video to start (seconds) | `10` = start at 10 seconds |
| `duration` | How long the ad is (seconds) | `15` = 15 second ad |
| `accentColor` | Color of the name and button | `"#E8A000"` = gold |

**Save the file and the preview updates instantly!**

### Add a new video
1. Put your `.mp4` file in the `public/` folder
2. Copy one of the video blocks in `videos.config.ts`
3. Paste it at the bottom, change the values
4. Save — it appears in the sidebar

---

## 📤 Export the Final Video

### For social media (MP4):
```bash
npx remotion render trucks-growth out/trucks-growth.mp4
```

### For Premiere Pro (ProRes):
```bash
npx remotion render trucks-growth out/trucks-growth.mov --codec=prores
```

Replace `trucks-growth` with whatever video `id` you want to render.

---

## 📁 Project Structure

```
video-ads/
├── public/              ← Put source video files here
├── src/
│   ├── videos.config.ts ← ✏️ EDIT THIS (text, timing, colors)
│   ├── BulkLoadsAd.tsx  ← The video template (don't need to edit)
│   └── Root.tsx         ← Auto-loads from config (don't need to edit)
├── out/                 ← Rendered videos go here
└── README.md            ← You're reading this!
```

---

## 🆘 Troubleshooting

**Video won't play?**
→ Make sure the `.mp4` file is in the `public/` folder and the filename matches `videoFile` in the config.

**Black screen?**
→ Check `startAt` — if it's past the end of the video, you'll see black.

**Text too long?**
→ Shorten the `quote`. It should be 1-2 sentences max for readability.

**Need help?**
→ Message BulkBot or William!
