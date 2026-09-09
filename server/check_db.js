require('dotenv').config();
const connectDB = require('./src/config/db');
const Appointment = require('./src/models/Appointment');
const Payment = require('./src/models/Payment');
const Manager = require('./src/models/Manager');

async function main() {
  await connectDB();
  const mgr = await Manager.findOne({ email: 'vasai@vexora.com' });
  console.log('Manager:', JSON.stringify(mgr ? {salonId:mgr.salonId, permissions:mgr.permissions} : null));
  const apt = await Appointment.countDocuments({ salonId: 'SAL-PLG-002' });
  const pay = await Payment.countDocuments({ salonId: 'SAL-PLG-002' });
  const aptCompleted = await Appointment.find({ salonId: 'SAL-PLG-002', status: 'completed' }).limit(3);
  console.log('Appointments count:', apt, 'Payments count:', pay);
  console.log('Completed apts sample:', JSON.stringify(aptCompleted.map(a => ({id:a.appointmentId, price:a.price, status:a.status}))));
  process.exit(0);
}
main().catch(e => { console.error(e.message); process.exit(1); });
