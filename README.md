## Overview  
A Next.js app that syncs Azure DevOps PBIs with Miro boards using OAuth2 for authentication and the Miro SDK/REST API alongside Azure DevOps REST calls citeturn0search1turn0search2.

## Setup  
1. **Clone & install**  
   ```bash
   git clone https://github.com/your‑org/sync-azure-pbis.git
   cd sync-azure-pbis
   npm install
   ```  
2. **Environment**  
   Create a `.env.local` in the project root with:  
   ```env
   MIRO_CLIENT_ID=your_miro_client_id
   MIRO_CLIENT_SECRET=your_miro_client_secret
   MIRO_REDIRECT_URI=http://localhost:3000/api/redirect

   AZURE_DEVOPS_ORG=https://dev.azure.com/your-org
   AZURE_DEVOPS_PAT=your_personal_access_token
   ```  
   Next.js auto‑loads `.env.local` into `process.env` for server and client (when prefixed with `NEXT_PUBLIC_`) citeturn0search0turn0search3.

## Usage  
- **Dev server:** `npm run dev` (defaults to `http://localhost:3000`)  
- **Login:** Click **Login** in the Miro panel to open the OAuth popup; on success it auto‑reloads via `postMessage` citeturn0search1.  
- **Features:**  
  - List your Miro boards  
  - Create sticky notes via SDK  
  - Receive Azure DevOps webhooks to update Miro  
  - Listen for board changes and push updates back to Azure DevOps  

## License  
Luka Palac
