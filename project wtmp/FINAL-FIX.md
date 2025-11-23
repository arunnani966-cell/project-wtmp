# Final Fix: "Site Can't Be Reached"

## Step-by-Step Solution

### Step 1: Check if Server is Actually Running

1. **Double-click `test-server-direct.bat`**
   - This will show you exactly what's happening
   - Look for "✅ SERVER IS RUNNING!" message

2. **If you see an error:**
   - "Port 8000 is already in use" → Close other apps or change port
   - "Cannot find module" → Node.js issue
   - Any other error → Share the error message

### Step 2: Verify Server is Listening

After starting the server, check if it's actually listening:

1. Open a **new** Command Prompt window
2. Type: `netstat -ano | findstr :8000`
3. If you see a line with `LISTENING`, the server is running
4. If you see nothing, the server didn't start

### Step 3: Check Windows Firewall

Windows Firewall might be blocking Node.js:

1. Open Windows Defender Firewall
2. Click "Allow an app or feature"
3. Find "Node.js" and make sure it's allowed
4. Or temporarily disable firewall to test

### Step 4: Try Different Port

If port 8000 is blocked:

1. Edit `server.js`
2. Change `const PORT = 8000;` to `const PORT = 3000;`
3. Restart server
4. Use `http://localhost:3000` in browser

### Step 5: Manual Test

1. Open Command Prompt
2. Navigate to project folder:
   ```
   cd "C:\Users\arunn\OneDrive\Tài liệu\project wtmp"
   ```
3. Run: `node server.js`
4. You should see "✅ SERVER IS RUNNING!"
5. **Keep this window open**
6. Open browser to `http://localhost:8000`

## Common Issues

### Issue: "Site can't be reached" but server shows "RUNNING"
**Solution:**
- Try `http://127.0.0.1:8000` instead of `localhost:8000`
- Check Windows Firewall
- Try a different browser

### Issue: Server starts then immediately closes
**Solution:**
- There's an error - check the terminal output
- Make sure you're in the correct directory
- Check if all files exist

### Issue: Port already in use
**Solution:**
- Close other applications
- Or change port in server.js
- Or restart your computer

## Quick Diagnostic

Run this in Command Prompt (in project folder):
```cmd
node server.js
```

**Expected output:**
```
============================================================
  ✅ SERVER IS RUNNING!
============================================================

📂 Serving from: C:\Users\arunn\OneDrive\Tài liệu\project wtmp
🌐 Server URL: http://localhost:8000
```

If you see this, server is working. Then try the browser.

## Still Not Working?

Share these details:
1. What happens when you run `test-server-direct.bat`?
2. What's the last message you see in the terminal?
3. What happens when you try `http://localhost:8000` in browser?
4. Any error messages in browser console (F12)?

