// Simple HTTP Server using Node.js
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8000;

// Use process.cwd() to get the current working directory
// This will be the directory where you run the server from

// MIME types
const mimeTypes = {
    '.html': 'text/html',
    '.js': 'application/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.gif': 'image/gif',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
    console.log(`${req.method} ${req.url}`);

    // Remove query string
    let urlPath = req.url.split('?')[0];
    
    // Get current working directory (where server.js is located)
    const baseDir = process.cwd();
    
    // Parse URL - use current working directory
    let filePath;
    
    if (urlPath === '/' || urlPath === '') {
        filePath = path.join(baseDir, 'index.html');
    } else {
        // Remove leading slash
        urlPath = urlPath.startsWith('/') ? urlPath.substring(1) : urlPath;
        filePath = path.join(baseDir, urlPath);
    }
    
    // Normalize path to prevent directory traversal
    filePath = path.normalize(filePath);
    
    // Security: ensure file is within base directory
    if (!filePath.startsWith(baseDir)) {
        res.writeHead(403, { 'Content-Type': 'text/html' });
        res.end('<h1>403 - Forbidden</h1>', 'utf-8');
        return;
    }

    // Get file extension
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    // Read and serve file
    fs.readFile(filePath, (error, content) => {
        if (error) {
            console.error(`Error serving ${filePath}:`, error.message);
            if (error.code === 'ENOENT') {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(`<h1>404 - File Not Found</h1><p>Requested: ${urlPath}</p><p>Looking in: ${baseDir}</p>`, 'utf-8');
            } else {
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end(`<h1>500 - Server Error</h1><p>${error.message}</p>`, 'utf-8');
            }
        } else {
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Access-Control-Allow-Origin': '*',
                'Cache-Control': 'no-cache'
            });
            res.end(content, 'utf-8');
        }
    });
});

server.on('error', (error) => {
    if (error.code === 'EADDRINUSE') {
        console.error(`\n❌ ERROR: Port ${PORT} is already in use!`);
        console.error('Please close other applications using port 8000');
        console.error('Or change PORT in server.js to a different number\n');
        process.exit(1);
    } else {
        console.error(`\n❌ ERROR starting server: ${error.message}\n`);
        process.exit(1);
    }
});

server.listen(PORT, () => {
    const baseDir = process.cwd();
    console.log('='.repeat(60));
    console.log('  ✅ SERVER IS RUNNING!');
    console.log('='.repeat(60));
    console.log(`\n📂 Serving from: ${baseDir}`);
    console.log(`🌐 Server URL: http://localhost:${PORT}`);
    console.log('\n' + '-'.repeat(60));
    console.log('  IMPORTANT:');
    console.log('  • Keep this window OPEN while using the app');
    console.log('  • Open this URL in your browser:');
    console.log(`    http://localhost:${PORT}`);
    console.log('  • Press Ctrl+C to stop the server');
    console.log('-'.repeat(60) + '\n');
    
    // List available files for debugging
    try {
        const files = fs.readdirSync(baseDir);
        console.log('📄 Files in directory:');
        files.filter(f => f.endsWith('.html') || f.endsWith('.js') || f.endsWith('.css')).forEach(f => {
            console.log(`   - ${f}`);
        });
        console.log('');
    } catch (e) {
        console.log('⚠️  Could not list files\n');
    }
    
    // Try to open browser
    const { exec } = require('child_process');
    const url = `http://localhost:${PORT}`;
    
    setTimeout(() => {
        const platform = process.platform;
        let command;
        
        if (platform === 'win32') {
            command = `start ${url}`;
        } else if (platform === 'darwin') {
            command = `open ${url}`;
        } else {
            command = `xdg-open ${url}`;
        }
        
        exec(command, (error) => {
            if (error) {
                console.log('Could not open browser automatically.');
                console.log(`Please manually open: ${url}`);
            }
        });
    }, 1000);
});
