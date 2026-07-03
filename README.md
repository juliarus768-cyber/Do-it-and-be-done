# Do It and Be Done

Do It and Be Done is a polished family productivity and rewards web app for two children, Alex and Katya. Kids complete daily missions, earn coins and XP, build streaks, unlock badges, and claim realistic family rewards. Parents can track progress, reset demo data, and see reward requests.

## Features

- Vite + React app with plain CSS.
- Responsive layouts for phones, tablets, iPad, Android tablets, and desktop.
- Profile select for Alex, Katya, and Parent.
- Child dashboards with themed missions, XP, coins, streaks, completion rings, badge shelves, weekly challenge banners, and reward previews.
- Daily mission completion with localStorage persistence and double-count prevention.
- Reward store with locked, claimable, and claimed states.
- Parent dashboard with side-by-side child progress, completed and missed mission counts, reward requests, reset today, and add demo mission controls.
- Settings screen with reset all, reset today, weekday/weekend mode, reduced motion, sound placeholder, and theme preview.
- PWA manifest, install-friendly icon placeholders, and a simple service worker for offline-friendly app shell caching.

## Run Locally

```bash
npm install
npm run dev
```

Then open the local Vite URL shown in the terminal.

## Build

```bash
npm run build
```

The production build is created in `dist/`.

## Deploy To Vercel

1. Push this repository to GitHub.
2. In Vercel, choose **Add New Project**.
3. Import `juliarus768-cyber/Do-it-and-be-done`.
4. Use the default Vite settings:
   - Build command: `npm run build`
   - Output directory: `dist`
5. Deploy.

## Future Features

- Real parent and child logins.
- Database-backed missions, rewards, streaks, and reward approval workflow.
- Custom mission creation and scheduling.
- Push notifications for morning routines and reward approvals.
- Real sound effects and haptics.
- Parent-configurable reward prices and weekly challenges.
- Multi-family support.
