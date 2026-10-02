# DTC Live Bus Tracker • दिल्ली बस ट्रैकर

A full-stack web application providing real-time tracking for Delhi Transport Corporation (DTC) and DIMTS buses. It utilizes Delhi Open Transit Data (OTD) live GPS telemetry (GTFS-Realtime) and integrates with Google Gemini AI to provide predictive ETA and traffic analysis.

## Key Features

- **Real-Time GPS Tracking**: Monitors live telemetry of DTC and DIMTS buses using Delhi OTD GTFS-Realtime feeds.
- **AI-Powered ETA Predictions**: Utilizes Google Gemini AI to predict accurate ETAs factoring in historical transit times, real-time speeds, corridor congestion, and peak rush hours.
- **Interactive Map View**: Visualizes bus positions and transit hubs using Leaflet and Google Maps components.
- **Progressive Web App (PWA)**: Built with offline support and installability across mobile and desktop devices.
- **Rich Bus Data**: Displays vehicle type (EV/CNG), estimated speed, crowding status, and fare information.
- **Nearest Bus Stands**: Calculates the nearest transit hubs and bus stands using real-time spatial calculations.

## Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS 4, Framer Motion, Leaflet
- **Backend**: Node.js, Express, `gtfs-realtime-bindings`
- **AI Integration**: Google GenAI (`@google/genai`) for traffic & ETA predictions
- **Build Tools**: Vite, esbuild, TypeScript

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- `npm` or `bun`

### Environment Variables

Create a `.env` file in the root directory (you can use `.env.example` as a reference if available) and add the following:

```env
# Optional: Your Delhi OTD API Key. The app falls back to a default key if not provided.
DTC_API_KEY=your_dtc_otd_api_key

# Required for AI ETA Predictions: Your Google Gemini API Key
GEMINI_API_KEY=your_google_gemini_api_key

# Optional: Server Port (Defaults to 3000)
PORT=3000
```

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   bun install
   ```

### Running the Application

- **Development Mode**:
  Start the Express server and Vite development middleware with hot-module replacement (HMR).
  ```bash
  npm run dev
  ```
  The app will be accessible at `http://localhost:3000`.

- **Production Build**:
  Build the React frontend and bundle the Express server.
  ```bash
  npm run build
  ```

- **Production Mode**:
  Start the compiled production server.
  ```bash
  npm run start
  ```

## Available Scripts

- `npm run dev`: Starts the application in development mode (`tsx server.ts`).
- `npm run build`: Compiles the frontend via Vite and the backend via esbuild into the `dist` directory.
- `npm run start`: Runs the built production server (`node dist/server.cjs`).
- `npm run lint`: Runs the TypeScript compiler to type-check the code (`tsc --noEmit`).
- `npm run clean`: Removes the `dist` directory and built artifacts.

## Data Sources

- **Live Telemetry**: Delhi Open Transit Data (OTD) via GTFS-Realtime Protocol Buffers.
- **ETA Predictions**: Google Gemini AI.
