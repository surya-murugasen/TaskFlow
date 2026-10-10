import crypto from 'crypto';

const MAX_DRIFT_MS = 5 * 60 * 1000; // 5 minutes

export function verifyHmac(req, res, next) {
  const secret = process.env.ADMIN_INTEGRATION_SECRET;
  if (!secret) {
    console.error("ADMIN_INTEGRATION_SECRET is not configured");
    return res.status(500).json({ error: "Server misconfiguration" });
  }

  const signature = req.headers['x-admin-signature'];
  const timestamp = req.headers['x-admin-timestamp'];
  const nonce = req.headers['x-admin-nonce'];

  if (!signature || !timestamp || !nonce) {
    return res.status(401).json({ error: "Missing authentication headers" });
  }

  const reqTime = parseInt(timestamp, 10);
  if (isNaN(reqTime)) {
    return res.status(401).json({ error: "Invalid timestamp" });
  }

  const now = Date.now();
  if (Math.abs(now - reqTime) > MAX_DRIFT_MS) {
    return res.status(401).json({ error: "Request expired (timestamp drift)" });
  }

  // Canonical format must exactly match Central Admin
  // {HTTP_METHOD}\n{REQUEST_PATH}\n{TIMESTAMP}\n{NONCE}
  const canonicalString = `${req.method.toUpperCase()}\n${req.path}\n${timestamp}\n${nonce}`;
  
  const expectedSignature = crypto
    .createHmac('sha256', secret)
    .update(canonicalString)
    .digest('hex');

  // Constant time comparison to prevent timing attacks
  let isValid = false;
  try {
    isValid = crypto.timingSafeEqual(
      Buffer.from(signature, 'hex'),
      Buffer.from(expectedSignature, 'hex')
    );
  } catch (e) {
    // Length mismatch or invalid hex
    return res.status(401).json({ error: "Invalid signature format" });
  }

  if (!isValid) {
    return res.status(401).json({ error: "Invalid signature" });
  }

  next();
}
