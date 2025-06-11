# Netlify Deployment Guide

## Prerequisites

- A Netlify account
- Your repository pushed to GitHub, GitLab, or Bitbucket
- Environment variables ready

## Step 1: Install Dependencies

First, install the new Netlify plugin:

```bash
npm install
```

## Step 2: Environment Variables Setup

In your Netlify dashboard, go to Site settings > Environment variables and add:

### Miro API Configuration

- `MIRO_CLIENT_ID` - Your Miro client ID
- `MIRO_CLIENT_SECRET` - Your Miro client secret
- `MIRO_REDIRECT_URI` - https://syncazurepbis.netlify.app/api/auth/miro/callback

### Azure DevOps Configuration

- `AZURE_DEVOPS_ORG_URL` - Your Azure DevOps organization URL
- `AZURE_DEVOPS_PROJECT_ID` - Your project ID
- `AZURE_DEVOPS_PAT` - Your Personal Access Token

### Next.js Configuration

- `NEXTAUTH_URL` - https://syncazurepbis.netlify.app
- `NEXTAUTH_SECRET` - A random secret string for NextAuth
- `CUSTOM_KEY` - Any custom environment variables you need

## Step 3: Deploy to Netlify

### Option A: Connect Git Repository

1. Go to Netlify dashboard
2. Click "New site from Git"
3. Connect your repository
4. Netlify will automatically detect the build settings from `netlify.toml`

### Option B: Deploy from Local

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy your site
netlify deploy

# Deploy to production
netlify deploy --prod
```

## Step 4: Configure Domain and SSL

1. In Netlify dashboard, go to Domain settings
2. Add your custom domain (optional)
3. SSL certificate will be automatically provisioned

## Step 5: Test Your Deployment

- Test all API routes: `/api/auth/miro/*`, `/api/AzureDevOps/*`, `/api/redirect/*`
- Verify authentication flows work correctly
- Check that environment variables are properly configured

## Troubleshooting

### Common Issues:

1. **404 Page Not Found**:
   - Make sure `@netlify/plugin-nextjs` is installed
   - Check that build completed successfully in Netlify dashboard
   - Verify the publish directory is set correctly (should be `.next`)
   - Clear deploy cache in Netlify and redeploy
2. **API routes not working**: Check that the Netlify Next.js plugin is properly installed

3. **Environment variables not found**: Ensure they're set in Netlify dashboard, not just locally

4. **Build failures**: Check build logs in Netlify dashboard

### Build Commands:

- Build command: `npm run build` (configured in netlify.toml)
- Publish directory: `.next` (configured in netlify.toml)
- Node version: 22 (configured in netlify.toml)

## Additional Configuration

### Custom Headers (if needed)

Add to `netlify.toml`:

```toml
[[headers]]
  for = "/api/*"
  [headers.values]
    Access-Control-Allow-Origin = "*"
    Access-Control-Allow-Methods = "GET, POST, PUT, DELETE, OPTIONS"
    Access-Control-Allow-Headers = "Content-Type, Authorization"
```

### Form Handling (if you have forms)

```toml
[build]
  functions = "netlify/functions"
```
