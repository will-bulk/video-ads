import { Composition } from "remotion";
import { TestimonialVideo } from "./TestimonialVideo";
import { TestimonialVideoV2 } from "./TestimonialVideoV2";

// Hopper Bottom scene map (source: 1920x1080 @ ~24fps, soundbite 1.4-12.4s)
// Extracted as hopper-soundbite.mp4 (0-11s), 24fps → 264 frames
const HOPPER_SCENE_MAP = [
  { start: 0, end: 36, personX: null, label: "B-roll opening" },       // 0-1.5s
  { start: 36, end: 96, personX: 60, label: "Person talking" },        // 1.5-4s
  { start: 96, end: 168, personX: null, label: "B-roll trucks" },      // 4-7s
  { start: 168, end: 216, personX: 60, label: "Person talking" },      // 7-9s
  { start: 216, end: 264, personX: null, label: "B-roll end" },        // 9-11s
];

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="trucks-growth"
        component={TestimonialVideo}
        durationInFrames={14 * 30}
        fps={30}
        width={1080}
        height={1920}
        defaultProps={{
          src: "56YATPH7Yo0.mp4",
          name: "Terry Catlett — Catlett Trucking",
          quote: "We have 14 trucks. Six years ago we had two.",
        }}
      />
      <Composition
        id="hopper-bottom"
        component={TestimonialVideoV2}
        durationInFrames={264}
        fps={24}
        width={1080}
        height={1920}
        defaultProps={{
          src: "4ftIJGv8rU4.mp4",
          name: "David Gleason — Hopper Fleet Owner",
          quote: "They offered the best service, the most available freight. Kind of a no-brainer.",
          sceneMap: HOPPER_SCENE_MAP,
          sourceWidth: 1920,
          sourceHeight: 1080,
        }}
      />
    </>
  );
};
