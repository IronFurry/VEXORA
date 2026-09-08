require('dotenv').config();
const connectDB = require('./src/config/db');
const Manager = require('./src/models/Manager');
const jwt = require('jsonwebtoken');
const http = require('http');

async function main() {
  await connectDB();
  const mgr = await Manager.findOne({ email: 'vasai@vexora.com' });
  if (!mgr) { console.log('Manager not found'); process.exit(1); }
  const token = jwt.sign({ managerId: mgr.managerId }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
  const options = {
    hostname: 'localhost',
    port: 5000,
    path: '/api/dashboard/overview',
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  };
  
  const req = http.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      console.log('Status:', res.statusCode);
      try {
        const parsed = JSON.parse(data);
        console.log('KPIs:', JSON.stringify(parsed.data?.kpis, null, 2));
      } catch(e) {
        console.log('Raw:', data.slice(0, 500));
      }
      process.exit(0);
    });
  });
  req.on('error', (e) => { console.error('Request error:', e.message); process.exit(1); });
  req.setTimeout(5000, () => { console.error('Request timeout'); req.destroy(); process.exit(1); });
  req.end();
}
main().catch(e => { console.error(e); process.exit(1); });
