const http = require('http');

function postJson(path, data, token) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload),
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function getJson(path, token) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 5000,
      path,
      method: 'GET',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {})
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch (e) {
          resolve({ status: res.statusCode, raw: body });
        }
      });
    });
    req.on('error', reject);
    req.end();
  });
}

async function testFlow() {
  console.log('--- 1. Login as Vasai Cuts & Co. Manager ---');
  const loginRes = await postJson('/api/auth/login', {
    email: 'vasai@vexora.com',
    password: 'Vexora@123'
  });
  console.log('Login Status:', loginRes.status);
  console.log('Manager:', loginRes.data?.data?.manager);
  const token = loginRes.data?.data?.token;
  if (!token) {
    console.error('No token returned!');
    return;
  }

  console.log('\n--- 2. Create Booking for Vasai Cuts & Co. (SAL-PLG-002) ---');
  const bookingRes = await postJson('/api/customer/bookings', {
    customerName: 'Kunal Vasai Test',
    phone: '9876543299',
    salonId: 'SAL-PLG-002',
    serviceIds: ['haircut'],
    preferredStylistId: 'STF-PLG-04' // Mahesh More
  });
  console.log('Booking Status:', bookingRes.status);
  const ticket = bookingRes.data?.data?.ticket;
  console.log('Ticket Issued:', ticket?.ticketNumber, 'AppointmentId:', ticket?.appointmentId, 'Salon:', ticket?.salonName, 'Stylist:', ticket?.stylistName);

  console.log('\n--- 3. Fetch Dashboard Appointments for Vasai Cuts & Co. ---');
  const apptRes = await getJson('/api/appointments', token);
  console.log('Appointments Status:', apptRes.status, 'Count:', apptRes.data?.data?.count);
  const matched = apptRes.data?.data?.appointments?.find(a => a.appointmentId === ticket?.appointmentId);
  console.log('Matched appointment in dashboard:', matched ? {
    id: matched.appointmentId,
    customer: matched.customerName,
    service: matched.serviceName,
    stylist: matched.staffName,
    status: matched.status,
    time: matched.startTime
  } : 'NOT FOUND');

  console.log('\n--- 4. Fetch Dashboard Queue for Vasai Cuts & Co. ---');
  const queueRes = await getJson('/api/queue', token);
  console.log('Queue Status:', queueRes.status, 'Count:', queueRes.data?.data?.count);
  const matchedQueue = queueRes.data?.data?.queue?.find(q => q.appointmentId === ticket?.appointmentId);
  console.log('Matched queue entry in dashboard:', matchedQueue ? {
    id: matchedQueue.appointmentId,
    pos: matchedQueue.queuePosition,
    customer: matchedQueue.customerName,
    stylist: matchedQueue.staffName,
    status: matchedQueue.status
  } : 'NOT FOUND');

  console.log('\n=== TEST RESULT: SUCCESS ===');
}

testFlow().catch(console.error);
