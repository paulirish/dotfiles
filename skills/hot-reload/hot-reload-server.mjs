import http from 'http';
import fs from 'fs';

const PORT = process.env.PORT || 50523;
const clients = new Set();
const IGNORE_RE = /^\.|node_modules|tests|\.md$|hot-reload-server\.js|package\.json/;

const server = http.createServer((req, res) => {
  if (req.url !== '/events') {
    res.writeHead(404);
    return res.end();
  }

  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
    'Access-Control-Allow-Origin': '*'
  });
  res.write('\n');

  clients.add(res);
  console.log(`[${new Date().toLocaleTimeString()}] Extension newly connected (total: ${clients.size})`);
  req.on('close', () => clients.delete(res));
});

function notifyClients() {
  if (clients.size === 0) return;
  console.log(`[${new Date().toLocaleTimeString()}] Reloading ${clients.size} client(s)...`);
  clients.forEach(res => res.write('data: reload\n\n'));
}

let timeoutId;
try {
  fs.watch('.', { recursive: true }, (_, filename) => {
    if (!filename || IGNORE_RE.test(filename)) return;

    clearTimeout(timeoutId);
    timeoutId = setTimeout(notifyClients, 100);
  });
  console.log(`Hot reload server watching on port ${PORT}...`);
} catch (err) {
  if (err.code === 'ERR_FEATURE_UNAVAILABLE_ON_PLATFORM') {
    console.error('Recursive fs.watch is not supported on this platform.');
  } else {
    throw err;
  }
}

server.listen(PORT);
