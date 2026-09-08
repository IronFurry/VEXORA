require('dotenv').config();
const connectDB = require('./src/config/db');
const Staff = require('./src/models/Staff');
const Appointment = require('./src/models/Appointment');
const Payment = require('./src/models/Payment');

async function main() {
  await connectDB();
  
  const staff = await Staff.find({ salonId: 'SAL-PLG-002' });
  console.log('Staff count:', staff.length, staff.map(s => ({id: s.staffId, name: s.name, status: s.status})));
  
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);
  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);
  
  // Check the aggregation directly
  const [revenueAgg] = await Payment.aggregate([
    {
      $match: {
        salonId: 'SAL-PLG-002',
        status: 'paid',
        paymentTime: { $gte: todayStart, $lte: todayEnd }
      }
    },
    { $group: { _id: null, total: { $sum: '$amount' }, count: { $sum: 1 } } }
  ]);
  console.log('Revenue aggregation:', revenueAgg);
  
  const completedCount = await Appointment.countDocuments({
    salonId: 'SAL-PLG-002',
    appointmentDate: { $gte: todayStart, $lte: todayEnd },
    status: 'completed'
  });
  console.log('Completed today:', completedCount);
  
  process.exit(0);
}
main().catch(e => { console.error(e); process.exit(1); });
