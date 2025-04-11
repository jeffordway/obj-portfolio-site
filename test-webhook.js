/**
 * Test script for Sanity revalidation webhook
 * Based on Sanity's official webhook implementation
 * 
 * Usage:
 * node test-webhook.js <webhook-url> <webhook-secret>
 * 
 * Example:
 * node test-webhook.js https://your-site.com/api/revalidate your-webhook-secret
 */

const crypto = require('crypto');
const https = require('https');
const url = require('url');

// Get command line arguments
const webhookUrl = process.argv[2];
const webhookSecret = process.argv[3];

if (!webhookUrl || !webhookSecret) {
  console.error('Usage: node test-webhook.js <webhook-url> <webhook-secret>');
  process.exit(1);
}

// Create a test payload similar to what Sanity would send
const payload = {
  _id: 'test-document-id',
  _type: 'project',
  slug: { current: 'test-project' },
  _rev: 'test-revision',
  _createdAt: new Date().toISOString(),
  _updatedAt: new Date().toISOString()
};

// Convert payload to JSON string
const stringifiedPayload = JSON.stringify(payload);

// Create signature exactly as Sanity does
// Sanity uses the raw body buffer for signature generation
const signature = crypto
  .createHmac('sha256', webhookSecret)
  .update(Buffer.from(stringifiedPayload))
  .digest('hex');

// Parse the webhook URL
const parsedUrl = url.parse(webhookUrl);

// Configure the request options
const options = {
  hostname: parsedUrl.hostname,
  port: parsedUrl.port || (parsedUrl.protocol === 'https:' ? 443 : 80),
  path: parsedUrl.path,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(stringifiedPayload),
    'x-sanity-signature': signature
  }
};

console.log(`Sending test webhook to: ${webhookUrl}`);
console.log(`Payload: ${stringifiedPayload}`);
console.log(`Signature: ${signature}`);

// Send the request
const req = https.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response body:');
    try {
      const parsedData = JSON.parse(data);
      console.log(JSON.stringify(parsedData, null, 2));
    } catch (e) {
      console.log(data);
    }
  });
});

req.on('error', (e) => {
  console.error(`Error: ${e.message}`);
});

// Write the payload to the request body
req.write(stringifiedPayload);
req.end();
