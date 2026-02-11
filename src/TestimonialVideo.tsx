import React from "react";
import {
  AbsoluteFill,
  OffthreadVideo,
  useCurrentFrame,
  useVideoConfig,
  interpolate,
  spring,
  staticFile,
} from "remotion";

type Props = {
  src: string;
  name: string;
  quote: string;
};

// Scene map: [startFrame, endFrame, personXPercent]
// personXPercent = where person's face is as % from left of 16:9 source
// null = no person (B-roll, use center crop)
const SCENE_MAP: [number, number, number | null][] = [
  [0, 60, null],      // 0-2s: truck B-roll, center
  [60, 180, 32],      // 2-6s: truck cab, person at ~32% from left
  [180, 240, null],   // 6-8s: driving road B-roll
  [240, 420, null],   // 8-14s: B-roll (trucks, aerial)
];

export const TestimonialVideo: React.FC<Props> = ({ src, name, quote }) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // Find current scene's person position
  let personX: number | null = null;
  for (const [start, end, x] of SCENE_MAP) {
    if (frame >= start && frame < end) {
      personX = x;
      break;
    }
  }

  // Calculate crop offset: source is 1920x1080, we want 9:16 crop = 607.5px wide
  // If person visible, center crop on them. Otherwise center of frame.
  const cropWidth = 608;
  const sourceWidth = 1920;
  const targetXPercent = personX ?? 50;
  const cropX = Math.max(
    0,
    Math.min(
      sourceWidth - cropWidth,
      (sourceWidth * targetXPercent) / 100 - cropWidth / 2
    )
  );

  // For CSS: we scale the 1920px source to fill 1080px output height (1920→1080 vertical)
  // The video is 1920x1080 source, displayed in 1080x1920 container
  // We need the video to fill height (1920px output), so video height = 1920, video width = 1920*(1920/1080) = 3413
  // Then shift left to crop
  const scaleFactor = 1920 / 1080; // how much to scale source to fill output height
  const scaledWidth = 1920 * scaleFactor; // ~3413px in output space
  const cropXInOutput = cropX * scaleFactor;

  // Fade in/out
  const opacity = interpolate(
    frame,
    [0, 10, durationInFrames - 10, durationInFrames],
    [0, 1, 1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  // Bottom bar slide up
  const barProgress = spring({
    frame: frame - 8,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const barY = interpolate(barProgress, [0, 1], [80, 0]);

  const quoteOpacity = interpolate(frame, [15, 30], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const nameOpacity = interpolate(frame, [25, 40], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const ctaOpacity = interpolate(frame, [40, 55], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const logoOpacity = interpolate(frame, [3, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {/* Video with dynamic crop */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 1080,
          height: 1920,
          overflow: "hidden",
          opacity,
        }}
      >
        <OffthreadVideo
          src={staticFile(src)}
          style={{
            position: "absolute",
            top: 0,
            left: -cropXInOutput,
            width: scaledWidth,
            height: 1920,
          }}
        />
      </div>

      {/* Gradient overlay at bottom */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: "45%",
          background: "linear-gradient(transparent, rgba(0,0,0,0.85))",
          opacity,
        }}
      />

      {/* BulkLoads brand badge at top */}
      <div
        style={{
          position: "absolute",
          top: 60,
          left: 0,
          right: 0,
          display: "flex",
          justifyContent: "center",
          opacity: logoOpacity,
        }}
      >
        <div
          style={{
            backgroundColor: "rgba(0,0,0,0.55)",
            borderRadius: 16,
            padding: "14px 28px",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 8,
              backgroundColor: "#E8A000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: 900,
              fontSize: 22,
              color: "#000",
              fontFamily: "Arial Black, sans-serif",
            }}
          >
            B
          </div>
          <span
            style={{
              color: "#fff",
              fontSize: 30,
              fontWeight: 700,
              fontFamily: "Arial, sans-serif",
              letterSpacing: -0.5,
            }}
          >
            BulkLoads
          </span>
        </div>
      </div>

      {/* Bottom content */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 40,
          right: 40,
          transform: `translateY(${barY}px)`,
        }}
      >
        <div
          style={{
            color: "#fff",
            fontSize: 44,
            fontWeight: 800,
            fontFamily: "Arial, sans-serif",
            lineHeight: 1.25,
            textShadow: "0 2px 10px rgba(0,0,0,0.6)",
            marginBottom: 20,
            opacity: quoteOpacity,
          }}
        >
          &ldquo;{quote}&rdquo;
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            opacity: nameOpacity,
          }}
        >
          <div
            style={{
              width: 4,
              height: 30,
              backgroundColor: "#E8A000",
              borderRadius: 2,
            }}
          />
          <span
            style={{
              color: "#E8A000",
              fontSize: 26,
              fontWeight: 700,
              fontFamily: "Arial, sans-serif",
            }}
          >
            {name}
          </span>
        </div>

        <div style={{ marginTop: 28, opacity: ctaOpacity }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: "#E8A000",
              color: "#000",
              fontSize: 26,
              fontWeight: 800,
              fontFamily: "Arial, sans-serif",
              padding: "14px 36px",
              borderRadius: 12,
            }}
          >
            Sign Up Free → bulkloads.com
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
