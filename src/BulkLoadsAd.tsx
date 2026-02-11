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

// ══════════════════════════════════════════════════════════
// 🎬 BulkLoads Testimonial Ad Component
//
// This is the template that controls how the video LOOKS.
// You probably don't need to edit this file.
// Edit "videos.config.ts" instead to change text & settings.
// ══════════════════════════════════════════════════════════

type Props = {
  videoFile: string;
  quote: string;
  speaker: string;
  ctaText: string;
  accentColor: string;
  startAt: number;
};

export const BulkLoadsAd: React.FC<Props> = ({
  videoFile,
  quote,
  speaker,
  ctaText,
  accentColor,
  startAt,
}) => {
  const frame = useCurrentFrame();
  const { fps, durationInFrames } = useVideoConfig();

  // ── Video scaling ──
  // Source is 16:9 (1920×1080), output is 9:16 (1080×1920)
  // We crop a vertical slice from the center
  const scaleFactor = 1920 / 1080;
  const scaledWidth = 1920 * scaleFactor;

  // Center crop (person is usually in the middle-ish)
  const cropX = (scaledWidth - 1080) / 2;

  // ── Animations ──
  const fadeIn = interpolate(frame, [0, 15], [0, 1], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp",
  });

  const fadeOut = interpolate(
    frame,
    [durationInFrames - 15, durationInFrames],
    [1, 0],
    { extrapolateLeft: "clamp", extrapolateRight: "clamp" }
  );

  const opacity = fadeIn * fadeOut;

  // Bottom bar slides up
  const barSlide = spring({
    frame: frame - 8,
    fps,
    config: { damping: 15, stiffness: 80 },
  });
  const barY = interpolate(barSlide, [0, 1], [80, 0]);

  // Text fades in one by one
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
      {/* ── Video Layer ── */}
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
          src={staticFile(videoFile)}
          startFrom={startAt * fps}
          style={{
            position: "absolute",
            top: 0,
            left: -cropX,
            width: scaledWidth,
            height: 1920,
          }}
        />
      </div>

      {/* ── Dark gradient at bottom (makes text readable) ── */}
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

      {/* ── BulkLoads Logo Badge (top center) ── */}
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
              backgroundColor: accentColor,
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

      {/* ── Quote + Speaker + CTA (bottom) ── */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          left: 40,
          right: 40,
          transform: `translateY(${barY}px)`,
        }}
      >
        {/* Quote */}
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

        {/* Speaker name */}
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
              backgroundColor: accentColor,
              borderRadius: 2,
            }}
          />
          <span
            style={{
              color: accentColor,
              fontSize: 26,
              fontWeight: 700,
              fontFamily: "Arial, sans-serif",
            }}
          >
            {speaker}
          </span>
        </div>

        {/* Call to Action button */}
        <div style={{ marginTop: 28, opacity: ctaOpacity }}>
          <div
            style={{
              display: "inline-block",
              backgroundColor: accentColor,
              color: "#000",
              fontSize: 26,
              fontWeight: 800,
              fontFamily: "Arial, sans-serif",
              padding: "14px 36px",
              borderRadius: 12,
            }}
          >
            {ctaText}
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};
