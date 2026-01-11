# Matatu Connect Frontend

This is the frontend for the Matatu Connect application, built with React and Vite.

## Prerequisites

- Node.js (Version 16 or higher recommended)
- npm

## Setup Instructions

1.  **Clone the repository** (if you haven't already):
    ```bash
    git clone <repository-url>
    cd matatu_connect_frontend
    ```

2.  **Install Dependencies**:
    This step is critical to resolve import errors like `lucide-react`.
    ```bash
    npm install
    ```

3.  **Run Development Server**:
    ```bash
    npm run dev
    ```
    The app should be available at `http://localhost:5173`.

## Troubleshooting

- **"Module not found: Can't resolve..."**: If you see errors about missing modules (e.g., `lucide-react`), ensure you ran `npm install` before starting the server.
- **Port Conflicts**: If port 5173 is in use, Vite will automatically try the next available port.
