# Express Server

A simple Node.js Express server with basic API endpoints.

## Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm

### Installation

1. Install dependencies:
```bash
npm install
```

### Running the Server

#### Development Mode (with auto-restart)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

The server will start on `http://localhost:3000`

## API Endpoints

### Public Endpoints

#### GET /
- Returns welcome message and available endpoints

#### GET /api/health
- Health check endpoint
- Returns server status and uptimes
