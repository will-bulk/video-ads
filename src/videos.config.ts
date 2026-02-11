// ╔══════════════════════════════════════════════════════════════════╗
// ║                    🎬 VIDEO ADS CONFIG                         ║
// ║                                                                ║
// ║  This is the ONLY file you need to edit!                       ║
// ║  Change the text, save the file, and see it update live.       ║
// ╚══════════════════════════════════════════════════════════════════╝

export const videos = [

  // ─────────────────────────────────────────────────
  // VIDEO 1: Terry Catlett — Trucks Growth
  // ─────────────────────────────────────────────────
  {
    id: "trucks-growth",

    // 📹 Source video filename (must be in the "public" folder)
    videoFile: "56YATPH7Yo0.mp4",

    // 💬 The quote shown on screen
    quote: "We have 14 trucks. Six years ago we had two.",

    // 👤 Speaker name and company
    speaker: "Terry Catlett — Catlett Trucking",

    // 🔘 Call-to-action button text
    ctaText: "Sign Up Free → bulkloads.com",

    // ⏱️ Timing (in seconds)
    startAt: 36,     // Where in the YouTube video to start
    duration: 14,    // How long the ad is

    // 🎨 Brand color for accents (BulkLoads gold)
    accentColor: "#E8A000",
  },

  // ─────────────────────────────────────────────────
  // VIDEO 2: David Gleason — Hopper Bottom
  // ─────────────────────────────────────────────────
  {
    id: "hopper-bottom",

    videoFile: "4ftIJGv8rU4.mp4",

    quote: "They offered the best service, the most available freight. Kind of a no-brainer.",

    speaker: "David Gleason — Hopper Fleet Owner",

    ctaText: "Sign Up Free → bulkloads.com",

    startAt: 0,
    duration: 11,

    accentColor: "#E8A000",
  },

  // ─────────────────────────────────────────────────
  // 📋 TO ADD A NEW VIDEO:
  // 1. Copy one of the blocks above
  // 2. Paste it below
  // 3. Change the values
  // 4. Put your video file in the "public" folder
  // 5. Save this file — it updates live in the preview!
  // ─────────────────────────────────────────────────

];
