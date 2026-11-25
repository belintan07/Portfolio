const http = require('http');
const https = require('https');
const fs = require('fs');
const path = require('path');

const HTTP_PORT = parseInt(process.env.PORT, 10) || 8000;
const HTTPS_PORT = parseInt(process.env.HTTPS_PORT, 10) || 8443;
const ROOT = __dirname;

const PFX_PATH = process.env.TLS_PFX_PATH || path.join(ROOT, '.certs', 'localhost.pfx');
const PFX_PASSPHRASE = process.env.TLS_PFX_PASSPHRASE || 'dev-localhost-https';
const CERT_PATH = process.env.TLS_CERT_PATH || path.join(ROOT, '.certs', 'localhost.crt');
const KEY_PATH = process.env.TLS_KEY_PATH || path.join(ROOT, '.certs', 'localhost.key');

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

function loadTlsOptions() {
  if (fs.existsSync(PFX_PATH)) {
    return {
      pfx: fs.readFileSync(PFX_PATH),
      passphrase: PFX_PASSPHRASE
    };
  }
  if (fs.existsSync(CERT_PATH) && fs.existsSync(KEY_PATH)) {
    return {
      cert: fs.readFileSync(CERT_PATH),
      key: fs.readFileSync(KEY_PATH)
    };
  }
  return null;
}

function getHostnameWithoutPort(hostHeader) {
  if (!hostHeader) return 'localhost';
  const trimmed = String(hostHeader).trim();
  if (trimmed.startsWith('[')) {
    const closeIdx = trimmed.indexOf(']');
    if (closeIdx !== -1) {
      return trimmed.slice(0, closeIdx + 1);
    }
  }
  return trimmed.split(':')[0] || 'localhost';
}

function setSecurityHeaders(res, isHttps) {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  if (isHttps) {
    res.setHeader('Content-Security-Policy', 'upgrade-insecure-requests');
    // Enable HSTS when explicitly opted in or on standard port 443 so HTTP->HTTPS port 8000 redirect remains reachable locally.
    if (HTTPS_PORT === 443 || process.env.ENABLE_HSTS === 'true') {
      res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
    }
  }
}

function handleStaticRequest(req, res, isHttps) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  setSecurityHeaders(res, isHttps);

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
}

const tlsOptions = loadTlsOptions();

if (tlsOptions) {
  const httpsServer = https.createServer(tlsOptions, (req, res) => {
    handleStaticRequest(req, res, true);
  });

  // Dual-stack listen: binds both IPv6 (::1) and IPv4 (127.0.0.1) on Windows
  httpsServer.listen(HTTPS_PORT, () => {
    console.log(`Portfolio HTTPS Server running on port ${HTTPS_PORT}:`);
    console.log(`  - https://localhost:${HTTPS_PORT}/`);
    console.log(`  - https://127.0.0.1:${HTTPS_PORT}/`);
    console.log(`  - https://[::1]:${HTTPS_PORT}/`);
    console.log(`  - https://localhost:${HTTPS_PORT}/portfolio/`);
    console.log(`  - https://localhost:${HTTPS_PORT}/templates/`);
  });

  httpsServer.on('error', (err) => {
    console.error('HTTPS server error:', err);
  });

  // Redirect plain HTTP requests cleanly to HTTPS
  const redirectServer = http.createServer((req, res) => {
    const hostname = getHostnameWithoutPort(req.headers.host);
    const portSuffix = HTTPS_PORT === 443 ? '' : `:${HTTPS_PORT}`;
    const targetUrl = `https://${hostname}${portSuffix}${req.url || '/'}`;
    res.writeHead(301, {
      Location: targetUrl,
      'Cache-Control': 'no-cache, no-store, must-revalidate'
    });
    res.end(`Redirecting to ${targetUrl}`);
  });

  redirectServer.listen(HTTP_PORT, () => {
    console.log(`HTTP -> HTTPS redirect listening on port ${HTTP_PORT} -> https://localhost:${HTTPS_PORT}/`);
  });

  redirectServer.on('error', (err) => {
    console.error('HTTP redirect server error:', err);
  });
} else {
  console.warn('No TLS certificate found in .certs/localhost.pfx. Falling back to HTTP on port ' + HTTP_PORT);
  console.warn('Run: powershell -ExecutionPolicy Bypass -File scripts/generate-cert.ps1');

  const httpServer = http.createServer((req, res) => {
    handleStaticRequest(req, res, false);
  });

  httpServer.listen(HTTP_PORT, () => {
    console.log(`Portfolio HTTP Server running on port ${HTTP_PORT}:`);
    console.log(`  - http://localhost:${HTTP_PORT}/`);
  });

  httpServer.on('error', (err) => {
    console.error('HTTP server error:', err);
  });
}
