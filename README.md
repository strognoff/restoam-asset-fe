# RestoAM Asset Frontend

React + Vite frontend for managing RestoAM Assets.

## Configure API

```bash
VITE_ASSET_API=http://localhost:8080/restoam/assets
VITE_LOCATION_APP_URL=http://localhost:5174
VITE_WORKORDER_APP_URL=http://localhost:5175
```

## Run

```bash
npm install
npm run dev
```

## Tests

```bash
npx playwright install --with-deps
npm run test:e2e
```

## Routes

- `/` Asset list
- `/assets` Asset list (alias)
- `/add` Add asset
- `/edit/:id` Edit asset
