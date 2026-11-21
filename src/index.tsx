import { Composition, registerRoot } from "remotion";
import { TikTokAd } from "./TikTokAd";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition
        id="TikTokAd"
        component={TikTokAd}
        durationInFrames={540}
        fps={30}
        width={1080}
        height={1920}
      />
    </>
  );
};

registerRoot(RemotionRoot);
