import { Composition } from "remotion";
import { BulkLoadsAd } from "./BulkLoadsAd";
import { videos } from "./videos.config";

// ══════════════════════════════════════════════════════════
// This file auto-generates compositions from videos.config.ts
// You don't need to edit this file!
// ══════════════════════════════════════════════════════════

export const RemotionRoot: React.FC = () => {
  return (
    <>
      {videos.map((video) => (
        <Composition
          key={video.id}
          id={video.id}
          component={BulkLoadsAd}
          durationInFrames={Math.round(video.duration * 30)}
          fps={30}
          width={1080}
          height={1920}
          defaultProps={{
            videoFile: video.videoFile,
            quote: video.quote,
            speaker: video.speaker,
            ctaText: video.ctaText,
            accentColor: video.accentColor,
            startAt: video.startAt,
          }}
        />
      ))}
    </>
  );
};
