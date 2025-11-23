# 🚀 Deploy to Netlify - Get Your App URL

## Step-by-Step Guide

### Step 1: Create Netlify Account

1. Go to: **https://www.netlify.com/**
2. Click **"Sign up"** (top right)
3. Sign up with:
   - GitHub (easiest - if you have GitHub)
   - Email
   - Google account

### Step 2: Deploy Your App

**Method A: Drag & Drop (Easiest)**

1. After signing in, you'll see the Netlify dashboard
2. Look for **"Sites"** section
3. Find the area that says **"Want to deploy a new site without connecting to Git? Drag and drop your site output folder here"**
4. **Drag your entire project folder** into that area
5. Wait for upload (you'll see progress)
6. Netlify will automatically deploy your site
7. You'll get a URL like: `https://random-name-12345.netlify.app`

**Method B: Manual Upload**

1. Click **"Add new site"** → **"Deploy manually"**
2. Drag your project folder
3. Wait for deployment
4. Get your URL

### Step 3: Get Your URL

After deployment:
- Your site URL will be shown on the dashboard
- It looks like: `https://your-app-name-12345.netlify.app`
- You can change the name in Site settings → General → Site details → Change site name

### Step 4: Test Your App

1. Click on your site URL
2. Your Recipe Generator app should load!
3. Test all features to make sure everything works

### Step 5: Use URL for PWA Builder

1. Copy your Netlify URL
2. Go to: **https://www.pwabuilder.com/**
3. Paste your URL
4. Click "Start"
5. Build your APK!

## Custom Domain (Optional)

You can also set a custom domain:
1. Go to Site settings → Domain management
2. Add your custom domain
3. Follow Netlify's instructions

## Important Notes

- **Free forever** - Netlify free tier is generous
- **HTTPS automatically** - Your site will have SSL
- **Fast CDN** - Your app will load quickly worldwide
- **Auto-deploy** - If you connect to Git, updates deploy automatically

## Troubleshooting

**App not loading?**
- Make sure all files are in the folder (index.html, app.js, styles.css)
- Check browser console for errors
- Make sure server.js is NOT needed (Netlify serves static files)

**API not working?**
- TheMealDB API should work fine from Netlify
- If blocked, check CORS settings

## Quick Checklist

- [ ] Created Netlify account
- [ ] Dragged project folder to Netlify
- [ ] Got deployment URL
- [ ] Tested app in browser
- [ ] Copied URL for PWA Builder

## Your URL Format

After deployment, your URL will be:
```
https://[random-name]-[numbers].netlify.app
```

Example:
```
https://recipe-generator-abc123.netlify.app
```

You can change the name part in settings!

