# Suggestions Module - Vipps MobilePay

A complete React implementation of the Suggestions module for the Vipps MobilePay app, featuring personalized payment suggestions with pinning, customization, and transparency features.

## 🎯 Features

- **Algorithm-based suggestions** - Dynamic list of people/merchants based on past behavior
- **Pinning favorites** - Pin contacts to always appear at the top
- **Customization controls** - Hide suggestions, filter by type, adjust display options
- **Transparency** - Clear "why suggested" explanations for each item
- **Edit mode** - Reorder and manage pinned items with drag & drop
- **Settings panel** - Full control over suggestion behavior
- **Edge case handling** - Empty states, disabled suggestions, etc.

## 📁 Project Structure

```
src/
├── components/
│   ├── Avatar/              # User/merchant avatar with pin badge
│   ├── SuggestionItem/      # Individual suggestion tile
│   ├── PinnedList/          # Pinned favorites section
│   ├── SuggestedList/       # Algorithm suggestions section
│   ├── ActionSheet/         # iOS-style context menu
│   ├── Toast/               # Feedback notifications
│   ├── SuggestionSettings/  # Settings panel
│   ├── SuggestionsModule/   # Main orchestrating component
│   └── EmptyStates/         # Empty/edge case states
├── data/
│   └── mockData.ts          # Mock suggestions and settings
├── types/
│   └── index.ts             # TypeScript interfaces
├── styles/
│   ├── variables.css        # Design tokens from Figma
│   └── global.css           # Global styles
├── App.tsx                  # Demo app wrapper
└── main.tsx                 # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd suggestions-module
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the demo.

### Build

```bash
npm run build
```

## 🎨 Design System

The components follow the Vipps MobilePay design system extracted from Figma:

### Colors
- **Primary tint**: `#ff5b24` (Vipps orange)
- **Secondary tint**: `#5e3dc2` (Purple links)
- **Avatar background**: `#ffe5db` (Peach)
- **Surface**: `#f7f7f7` (Light gray cards)

### Typography
- **Font family**: SF Pro / system fonts
- **Sizes**: 11px (caption) → 18px (title)

### Spacing
- Base unit: 8px
- Avatar size: 56px
- Card radius: 10px

## 📱 Components

### `<SuggestionsModule />`

Main component that orchestrates the entire suggestions experience.

```tsx
import { SuggestionsModule } from './components';

function App() {
  return <SuggestionsModule />;
}
```

### `<PinnedList />`

Displays pinned favorites with optional edit mode.

```tsx
<PinnedList
  suggestions={pinnedSuggestions}
  isEditMode={false}
  onTap={handleTap}
  onLongPress={handleLongPress}
  onUnpin={handleUnpin}
  onReorder={handleReorder}
/>
```

### `<SuggestedList />`

Horizontal scrolling list of algorithm suggestions.

```tsx
<SuggestedList
  suggestions={algorithmSuggestions}
  onTap={handleTap}
  onLongPress={handleLongPress}
/>
```

### `<SuggestionSettings />`

Full settings panel for customizing suggestions.

```tsx
<SuggestionSettings
  isOpen={showSettings}
  settings={settings}
  hiddenSuggestions={hiddenSuggestions}
  onClose={() => setShowSettings(false)}
  onUpdateSettings={handleUpdateSettings}
  onUnhide={handleUnhide}
  onUnhideAll={handleUnhideAll}
  onReset={handleReset}
/>
```

## 📋 User Flows

See [docs/USER_FLOW.md](./docs/USER_FLOW.md) for detailed user flow documentation.

## 🖼️ Screen Breakdown

See [docs/SCREEN_BREAKDOWN.md](./docs/SCREEN_BREAKDOWN.md) for screen-by-screen implementation details.

## ⚡ Interactions

| Gesture | Action |
|---------|--------|
| Tap | Quick action (send/request) |
| Long press | Open context menu |
| Horizontal scroll | View more suggestions |
| Drag (edit mode) | Reorder pinned items |

## 🔧 Configuration

### Settings Options

```typescript
interface SuggestionsSettings {
  isEnabled: boolean;           // Show/hide suggestions
  pinnedPosition: 'above' | 'replace';  // Pinned display mode
  showPeople: boolean;          // Filter: show people
  showMerchants: boolean;       // Filter: show merchants
  prioritizeRecent: boolean;    // Sort by recency
}
```

## 📝 License

Internal Vipps MobilePay design prototype.

