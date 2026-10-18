# Shamsi Solar (شمسي)

Solar savings calculator for homes in Jordan, as an installable phone app (PWA).
Arabic and English. Follows EMRC tiered tariffs, Bylaw 58 of 2024 net billing,
and the Personal Data Protection Law 24 of 2023.

## Run locally
    npm start        # http://localhost:3000

## Deploy on Railway
New Project -> Deploy from GitHub repo -> pick this repo.
Then Settings -> Networking -> Generate Domain. Railway sets PORT automatically.

## Before launch
Edit `CONFIG` at the bottom of `public/index.html`:
- `phoneDisplay` and `whatsapp`: your real business number
- installer cost per kWp and grid fee can be changed in the app's expert section

## Install on a phone
Open the link. iPhone (Safari): Share -> Add to Home Screen.
Android (Chrome): menu -> Install app.

## Live on GitHub Pages
The `gh-pages` branch holds the contents of `public/` and is served at
https://mato1999.github.io/shamsi-solar/
