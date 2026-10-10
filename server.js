import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { verifyHmac } from './middleware/hmacAuth.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// Integration Endpoints (Protected by HMAC)
app.get('/api/health', verifyHmac, (req, res) => {
  res.json({
    status: 'healthy',
    service: 'TaskFlow',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    uptimeSeconds: process.uptime()
  });
});

app.get('/api/stats', verifyHmac, (req, res) => {
  // Since this is a pilot, we return generic aggregate stats.
  // In a full implementation, we'd query the DB safely here.
  res.json({
    service: 'TaskFlow',
    timestamp: new Date().toISOString(),
    metrics: {
      activeUsers: 1,
      totalTasks: 42,
      completedTasks: 15
    }
  });
});

// Serve static Vite app for production fallback
app.use(express.static(path.join(__dirname, 'dist')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`TaskFlow Server running on http://localhost:${PORT}`);
});
