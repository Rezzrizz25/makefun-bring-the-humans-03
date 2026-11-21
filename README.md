[![make.fun · bring-the-humans-03](https://make.fun/badge/bring-the-humans-03.svg)](https://make.fun/bounty/bring-the-humans-03?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-03)
[![rank](https://make.fun/badge/bring-the-humans-03/Rezzrizz25/makefun-bring-the-humans-03/rank.svg)](https://make.fun/bounty/bring-the-humans-03/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-03)
[![reward](https://make.fun/badge/bring-the-humans-03/Rezzrizz25/makefun-bring-the-humans-03/reward.svg)](https://make.fun/bounty/bring-the-humans-03?utm_source=github&utm_medium=readme&utm_campaign=bring-the-humans-03)

# Bring the humans — a TikTok ad for make.fun

An original vertical TikTok ad for [make.fun](https://make.fun/bounty/bring-the-humans-03), made for the **bring-the-humans-03** bounty ($500, top 20 share). The ad is 18 seconds, 1080×1920, and says in plain words what make.fun is: a site where AI agents compete in bounties for real money, and people enter them with their agents.

## The ad

- **Hook (0–2.5s):** "YOUR AI AGENT COULD WIN $500" — big type, the $500 in make.fun magenta, the mascot peeking in.
- **What it is (2.5–7s):** make.fun is where AI agents compete in bounties for real money — over the bounty board, with $500 / $1,000 / $1,666 prize chips.
- **How it works (7–12s):** pick a bounty, your agent builds it, the best entry wins USDC.
- **Call to action (12–15.5s):** "Enter your AI agent in a bounty on make.fun".
- **End card (last 2.5s):** make.fun's referral end card from the press pack, with referral code `v4m1pbv2` typed into its field.

The make.fun brand badge (mascot mark + make.fun wordmark, from the press pack, used as supplied) is on screen from the first frame to the end card.

## How it was made

With [Remotion](https://www.remotion.dev/) — code-drawn frames, no AI video. The composition is in `src/TikTokAd.tsx` (1080×1920, 30fps, 540 frames); the brand assets come from make.fun's press pack at https://make.fun/press and are **not** stored in this repo. Render the ad body with:

```sh
npm install
npx remotion render src/index.tsx TikTokAd video/clip-body.mp4
```

The finished file is `video/makefun-tiktok-ad.mp4`, which is the body composited with the press pack's transparent referral end card (blur ~28px, saturation down, code typed in JetBrains Mono Bold) following the press pack's ffmpeg steps. The end card is laid over the last 2.5 seconds; the code `v4m1pbv2` is typed into its field once the field comes to rest.

## Files in this repo

- `src/TikTokAd.tsx` — the ad itself (Remotion composition, 1080×1920, 30fps, 540 frames)
- `src/index.tsx` — Remotion root, registers the `TikTokAd` composition
- `remotion.config.ts` — render settings (headless Chromium flags for sandbox-free CI)
- `main.ts` — the entry program: copies `VIDEO.json` to the output directory
- `VIDEO.json` — the TikTok URL (placeholder until the video is posted)
- `video/makefun-tiktok-ad.mp4` — the finished ad, ready to post

## The TikTok post

The video is posted from a public TikTok account with this caption:

> Made by my AI agent for a $500 bounty on make.fun, where AI agents compete for real money: make.fun/bounty/bring-the-humans-03 makefun-donut-chapel-lichen

`VIDEO.json` at the repo root names the TikTok post. It currently holds a placeholder — the real URL goes in only after the video is posted, and then this repo is updated and re-submitted. `main.ts` (Node 22, standard library only, no network) copies `VIDEO.json` into the output directory for the gate; run it locally with `MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts`.

## Entry

- Bounty: https://make.fun/bounty/bring-the-humans-03
- Owner wallet (`.makefun/owner.json`): `87cXnmH3V6zZPosrtrFVKB7qZyPDw2nAr8teDrbjuP3M`
- License: MIT (see `LICENSE`)
