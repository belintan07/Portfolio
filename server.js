const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = parseInt(process.env.PORT, 10) || 8000;
const ROOT = __dirname;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.htm': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.mjs': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.pdf': 'application/pdf',
  '.ttf': 'font/ttf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ico': 'image/x-icon',
  '.txt': 'text/plain; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8'
};

const server = http.createServer((req, res) => {
  // CORS & No-Cache headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.statusCode = 405;
    return res.end('Method Not Allowed');
  }

  let decodedPath;
  try {
    decodedPath = decodeURIComponent(req.url.split('?')[0]);
  } catch (e) {
    res.statusCode = 400;
    return res.end('Bad Request');
  }

  // Prevent directory traversal
  let safePath = path.normalize(decodedPath).replace(/^(\.\.[\/\\])+/, '');
  if (safePath === '/' || safePath === '\\' || safePath === '') {
    safePath = '/index.html';
  }

  let filePath = path.join(ROOT, safePath);

  // If path is a directory, check for index.html or dist/index.html
  if (fs.existsSync(filePath) && fs.statSync(filePath).isDirectory()) {
    const candidate1 = path.join(filePath, 'index.html');
    const candidate2 = path.join(filePath, 'dist', 'index.html');
    if (fs.existsSync(candidate1) && fs.statSync(candidate1).isFile()) {
      filePath = candidate1;
    } else if (fs.existsSync(candidate2) && fs.statSync(candidate2).isFile()) {
      filePath = candidate2;
    }
  }

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      res.statusCode = 404;
      res.setHeader('Content-Type', 'text/plain; charset=utf-8');
      return res.end(`404 Not Found: ${decodedPath}`);
    }

    const ext = path.extname(filePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', stats.size);

    if (req.method === 'HEAD') {
      return res.end();
    }

    const stream = fs.createReadStream(filePath);
    stream.pipe(res);
    stream.on('error', (streamErr) => {
      console.error('Stream error:', streamErr);
      if (!res.headersSent) {
        res.statusCode = 500;
        res.end('Internal Server Error');
      }
    });
  });
});

// Dual-stack listen: binds both IPv6 (::1) and IPv4 (127.0.0.1) on Windows
server.listen(PORT, () => {
  console.log(`Portfolio HTTP Server running on port ${PORT}:`);
  console.log(`  - http://localhost:${PORT}/`);
  console.log(`  - http://127.0.0.1:${PORT}/`);
  console.log(`  - http://[::1]:${PORT}/`);
  console.log(`  - http://localhost:${PORT}/portfolio/`);
});

server.on('error', (err) => {
  console.error('Server error:', err);
});
