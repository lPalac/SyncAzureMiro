## Overview

A Next.js app that syncs Azure DevOps PBIs with Miro boards using OAuth2 for authentication and the Miro SDK/REST API alongside Azure DevOps REST calls.

## Setup

1. **Clone & install**

   ```bash
   git clone https://github.com/your‑org/sync-azure-pbis.git
   cd sync-azure-pbis
   npm install
   ```

2. **Configure your Miro App**

   - Go to [Miro Developer Console](https://developers.miro.com/)
   - Create or select your app
   - In OAuth settings, set Redirect URI to: `http://localhost:3000/api/auth/miro/callback`
   - Copy your Client ID and Client Secret

3. **Environment Setup**  
   Create a `.env.local` in the project root with:

   ```env
   # Miro API Configuration
   MIRO_CLIENT_ID=your_miro_client_id_here
   MIRO_CLIENT_SECRET=your_miro_client_secret_here
   MIRO_REDIRECT_URI=http://localhost:3000/api/auth/miro/callback

   # Azure DevOps Configuration (Optional - for future features)
   AZURE_DEVOPS_ORG=https://dev.azure.com/your-org
   AZURE_DEVOPS_PAT=your_personal_access_token

   # Environment
   NODE_ENV=development
   ```

## Usage

- **Dev server:** `npm run dev` (defaults to `http://localhost:3000`)
- **Authentication:** Click **Connect to Miro** to start OAuth flow
- **Features:**
  - OAuth2 authentication with Miro
  - List your Miro boards with details
  - Secure session management
  - Future: Azure DevOps integration

## Authentication Flow

1. Click "Connect to Miro" button
2. Redirected to Miro OAuth authorization
3. Grant permissions to your app
4. Redirected back to localhost with auth code
5. App exchanges code for access tokens
6. View your Miro boards!

## Production Deployment

For production deployment, update your Miro app settings:

- Add production redirect URI: `https://your-domain.com/api/auth/miro/callback`
- Update your `.env.production` with the production redirect URI

## License

Luka Palac
