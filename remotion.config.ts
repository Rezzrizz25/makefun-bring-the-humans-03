// Remotion configuration for the make.fun TikTok ad.
// Vertical 9:16, 1080x1920, 30fps, 18 seconds (540 frames).
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
Config.setChromiumFlags({
  "no-sandbox": true,
  "disable-setuid-sandbox": true,
  "disable-gpu": true,
  "disable-dev-shm-usage": true,
});
Config.setChromiumOpenGlRenderer("swangle");
