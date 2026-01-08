# URL Shortener

A full-stack URL shortener application built with React and Node.js. This application allows users to verify easily shorten long URLs and manages the redirection logic via a dedicated backend.

## Features
- **URL Shortening**: Convert long URLs into compact, shareable links.
- **History Tracking**: Keep track of previously shortened URLs.
- **Responsive Design**: Modern UI built with React and styled for a premium experience.
- **Full-Stack Architecture**: Separation of concerns with a React frontend and Express backend.

## Tech Stack
- **Frontend**: React, Vite
- **Backend**: Node.js, Express
- **Utilities**: Nanoid (for unique ID generation), CORS

## Getting Started

### Prerequisites
- Node.js installed on your machine.
- NPM (Node Package Manager).

### Installation
1. Clone the repository.
2. Install dependencies for both frontend and backend:
   ```bash
   cd frontend && npm install
   cd ../backend && npm install
   cd ..
   ```

### Running the Application

To start the application, use the provided shell script in the root directory:

```bash
bash start.sh
```

### Why use `bash start.sh` instead of `npm run dev`?

This project is structured as a **monorepo** containing two distinct services:
1. **Frontend**: A React application (located in `/frontend`).
2. **Backend**: An Express API server (located in `/backend`).

Running a standard command like `npm run dev` inside the frontend folder would *only* start the user interface. Without the backend running, the application would fail to shorten URLs or fetch data because the API server wouldn't be listening for requests.

The `start.sh` script automates the development workflow by:
1. Starting the **Backend Server** (`npm start` in `backend/`).
2. Starting the **Frontend Server** (`npm run dev` in `frontend/`).
3. Running both processes concurrently in the background.
4. Managing process cleanup (stopping both servers when you exit the script).

This ensures you have the full development environment up and running with a single command.
