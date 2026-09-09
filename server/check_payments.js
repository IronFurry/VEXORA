require('dotenv').config();
const connectDB = require('./src/config/db');
const Appointment = require('./src/models/Appointment');
const Payment = require('./src/models/Payment');

async function main() {
  await connectDB();
  
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);
  
  console.log('Today range:', todayStart, '-', todayEnd);
  
  // All payments for this salon
  const allPayments = await Payment.find({ salonId: 'SAL-PLG-002' });
  console.log('All payments:', allPayments.map(p => ({
    id: p.paymentId, amount: p.amount, status: p.status,
    paymentTime: p.paymentTime, createdAt: p.createdAt
  })));
  
  // Today's completed appointments
  const todayCompleted = await Appointment.find({ 
    salonId: 'SAL-PLG-002', 
    status: 'completed',
    appointmentDate: { $gte: todayStart, $lte: todayEnd }
  });
  console.log('Today completed appts:', todayCompleted.length);
  console.log('Completed sample:', todayCompleted.map(a => ({id: a.appointmentId, price: a.price, date: a.appointmentDate})));
  
  // Today's payments
  const todayPayments = await Payment.find({
    salonId: 'SAL-PLG-002',
    status: 'paid',
    paymentTime: { $gte: todayStart, $lte: todayEnd }
  });
  console.log('Today paid payments:', todayPayments.length, todayPayments.map(p => ({id: p.paymentId, amount: p.amount, time: p.paymentTime})));
  
  process.exit(0);
}
main().catch(e => { console.error(e); process.exit(1); });
