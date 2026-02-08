# RestoAM Asset Management (Frontend)

React + Vite frontend for the RestoAM asset management service.

## Requirements

- Node.js 18+
- API running (default: `http://localhost:8080/restoam/assets`)

## Environment

Set the API base URL via:

```
VITE_ASSET_API=http://localhost:8080/restoam/assets
```

## Install

```
npm install
```

## Run

```
npm run dev
```

## Build

```
npm run build
```

## E2E Tests (Playwright)

```
npm run test:e2e
```

## Pages

- `/` Dashboard (summary chart)
- `/assets` Asset list + filters + pagination
- `/add` Add asset
- `/edit/:id` Edit asset
