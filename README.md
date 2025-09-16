# SAVR App

Expo Router app with custom bottom navigation, Home (Fridge), Recipes, and To Buy screens. Includes scanner, animations, details pages, and a Profile page with persistence.

## Quick start

- Requirements: Node 20+, npm, Android emulator or device with Expo Go
- Install deps:
  - `npm install`
- Run:
  - Android: `npm run android`
  - Web: `npm run web`
- If bundler caches misbehave:
  - `npx expo start -c`

## Features

- Custom orange bottom bar
  - Left: `Recipes`
  - Center FAB: `Home` icon; when already on Home, opens scanner
  - Right: `To Buy`
  - Uses image icons from `assets/images`
- Home (Fridge)
  - List with delete (X) + Reanimated enter/exit and layout animations
  - Tap image → item details `item/[id]`
- Recipes
  - Search, Sort (A↔Z), Filter (multi-select: Milk, Bread, Cheese, Ham)
  - Grid cards; tap → recipe details `recipes/[id]`
- Details pages
  - Heart toggle (favorite) turns red
  - Simple image carousel on tap with dots indicator
- Profile
  - Editable Name/Email, Units toggle (Metric/Imperial), Notifications toggle
  - Save persists via `lib/simpleStorage` (localStorage on web, memory fallback native)
- Scanner (Expo Camera)
  - `app/scanner.tsx` uses `expo-camera` `CameraView` with barcode scanning
  - Opened by tapping FAB while on Home

## Routes

- `app/(tabs)/index.tsx` — Home (Fridge)
- `app/(tabs)/recipes.tsx` — Recipes grid + menus
- `app/(tabs)/two.tsx` — To Buy
- `app/item/[id].tsx` — Item details
- `app/recipes/[id].tsx` — Recipe details
- `app/profile.tsx` — Profile
- `app/scanner.tsx` — Scanner modal
- `app/_layout.tsx` — Root stack
- `app/(tabs)/_layout.tsx` — Custom bottom bar

## Assets

- Place nav icons in `assets/images/`
  - `recipes-svgrepo-com.png` (Recipes)
  - `buying-on-smartphone-svgrepo-com.png` (To Buy)
  - `scan-alt-svgrepo-com.png` (FAB icon when on Home)

## Dependencies

- `expo-router` ~6
- `react-native-reanimated`
- `expo-camera`

Install camera if missing:

```bash
npx expo install expo-camera
```

## Notes

- If camera fails in Expo Go, ensure permissions are granted and restart with `npx expo start -c`.
- Node 20.19.4+ is recommended to avoid engine warnings. 