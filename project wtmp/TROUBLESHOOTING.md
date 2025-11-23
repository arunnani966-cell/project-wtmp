# Troubleshooting Guide

## Can't Run the Application?

### Step 1: Run Diagnostic Test
Double-click **`test-setup.bat`** to check:
- ✅ Node.js is installed
- ✅ All required files exist
- ✅ Port 8000 is available
- ✅ server.js has no syntax errors

### Step 2: Common Issues

#### ❌ "Node.js not found"
**Solution:**
1. Install Node.js from: https://nodejs.org/
2. Restart your computer after installation
3. Try `start-node.bat` again

#### ❌ "Port 8000 is already in use"
**Solution:**
1. Close other applications using port 8000
2. Or edit `server.js` and change `PORT = 8000` to `PORT = 8001`
3. Then use `http://localhost:8001` in browser

#### ❌ "Site can't be reached" in browser
**Solution:**
1. Make sure terminal shows "✅ SERVER IS RUNNING!"
2. Wait 2-3 seconds after starting server
3. Manually open: `http://localhost:8000`
4. Check Windows Firewall settings

#### ❌ "server.js has syntax errors"
**Solution:**
1. Make sure `server.js` file is not corrupted
2. Check if file was edited incorrectly
3. Re-download or restore `server.js` from backup

#### ❌ Terminal closes immediately
**Solution:**
1. Open Command Prompt manually
2. Navigate to project folder:
   ```
   cd "C:\Users\arunn\OneDrive\Tài liệu\project wtmp"
   ```
3. Run: `node server.js`
4. This will show any error messages

### Step 3: Manual Testing

1. **Open Command Prompt** (cmd)
2. **Navigate to project folder:**
   ```
   cd "C:\Users\arunn\OneDrive\Tài liệu\project wtmp"
   ```
3. **Test Node.js:**
   ```
   node --version
   ```
   Should show: `v24.11.1` or similar

4. **Test server.js:**
   ```
   node server.js
   ```
   Should show: "✅ SERVER IS RUNNING!"

5. **Open browser to:** `http://localhost:8000`

### Step 4: Still Not Working?

**Check these:**
- ✅ All files are in the same folder
- ✅ No antivirus is blocking Node.js
- ✅ Windows Firewall allows Node.js
- ✅ Browser is not blocking localhost

**Alternative: Use VS Code Live Server**
1. Install VS Code
2. Install "Live Server" extension
3. Right-click `index.html`
4. Select "Open with Live Server"

## Getting Help

If nothing works, please share:
1. Output from `test-setup.bat`
2. Any error messages you see
3. What happens when you run `node server.js` manually

