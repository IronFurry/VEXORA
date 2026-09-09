import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building2, 
  Clock, 
  Scissors, 
  Users, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Plus, 
  Trash2, 
  Sparkles,
  Store
} from 'lucide-react'
import { useNavigation } from '../context/NavigationContext'

export const Onboarding = () => {
  const { navigate } = useNavigation()
  const [step, setStep] = useState(1)

  // Form State
  const [details, setDetails] = useState({
    salonName: 'Looks & Co. Studio',
    ownerName: 'Ananya Roy',
    phone: '+91 98765 43210',
    city: 'Delhi NCR',
    address: 'Block C, Vasant Vihar'
  })

  const [hours, setHours] = useState([
    { day: 'Monday', isOpen: true, open: '09:00 AM', close: '08:00 PM' },
    { day: 'Tuesday', isOpen: true, open: '09:00 AM', close: '08:00 PM' },
    { day: 'Wednesday', isOpen: true, open: '09:00 AM', close: '08:00 PM' },
    { day: 'Thursday', isOpen: true, open: '09:00 AM', close: '08:00 PM' },
    { day: 'Friday', isOpen: true, open: '09:00 AM', close: '09:00 PM' },
    { day: 'Saturday', isOpen: true, open: '09:00 AM', close: '09:00 PM' },
    { day: 'Sunday', isOpen: false, open: '10:00 AM', close: '06:00 PM' },
  ])

  const [servicesList, setServicesList] = useState([
    { name: 'Signature Haircut', price: '650', duration: '45' },
    { name: 'Beard Trim & Style', price: '350', duration: '25' },
    { name: 'Luxury Spa Facial', price: '1200', duration: '60' },
  ])
  const [newService, setNewService] = useState({ name: '', price: '', duration: '30' })

  const [staffList, setStaffList] = useState([
    { name: 'Rahul Sharma', role: 'Senior Stylist' },
    { name: 'Priya Verma', role: 'Color Expert' },
  ])
  const [newStaff, setNewStaff] = useState({ name: '', role: 'Senior Stylist' })

  const handleAddService = (e) => {
    e.preventDefault()
    if (!newService.name || !newService.price) return
    setServicesList([...servicesList, newService])
    setNewService({ name: '', price: '', duration: '30' })
  }

  const handleAddStaff = (e) => {
    e.preventDefault()
    if (!newStaff.name) return
    setStaffList([...staffList, newStaff])
    setNewStaff({ name: '', role: 'Senior Stylist' })
  }

  const steps = [
    { num: 1, label: 'Salon Info', icon: Building2 },
    { num: 2, label: 'Working Hours', icon: Clock },
    { num: 3, label: 'Services', icon: Scissors },
    { num: 4, label: 'Staff & Chairs', icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 sm:p-6 font-sans">
      {/* VEXORA Brand Header */}
      <div className="w-full max-w-2xl mb-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-black text-white rounded-xl flex items-center justify-center font-mono font-bold text-sm shadow-md">
            VX
          </div>
          <div>
            <h1 className="font-mono font-bold tracking-tight text-gray-900 text-base">VEXORA</h1>
            <p className="text-[11px] text-gray-500 font-mono">Salon Partner Onboarding</p>
          </div>
        </div>
        <button
          onClick={() => navigate('landing')}
          className="text-xs text-gray-500 hover:text-black font-mono transition-colors"
        >
          Cancel & Exit
        </button>
      </div>

      {/* Progress Stepper */}
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-xl p-4 mb-6 shadow-2xs">
        <div className="flex items-center justify-between">
          {steps.map((s, idx) => {
            const Icon = s.icon
            const isCompleted = step > s.num
            const isCurrent = step === s.num
            return (
              <React.Fragment key={s.num}>
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-semibold font-mono transition-colors ${
                    isCompleted
                      ? 'bg-emerald-600 text-white'
                      : isCurrent
                      ? 'bg-black text-white'
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : <Icon className="w-4 h-4" />}
                  </div>
                  <span className={`hidden sm:inline text-xs font-medium ${
                    isCurrent ? 'text-gray-900 font-semibold' : 'text-gray-400'
                  }`}>
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`flex-1 h-0.5 mx-2 ${
                    step > s.num ? 'bg-emerald-500' : 'bg-gray-200'
                  }`} />
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* Wizard Card */}
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-2xl p-6 sm:p-8 shadow-sm">
        <AnimatePresence mode="wait">
          {/* Step 1: Salon Details */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Salon Basic Profile</h2>
                <p className="text-xs text-gray-500 mt-1">Provide public details for VEXORA customer discovery.</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Salon / Brand Name</label>
                  <input
                    type="text"
                    value={details.salonName}
                    onChange={(e) => setDetails({ ...details, salonName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-black focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Owner / Manager Name</label>
                  <input
                    type="text"
                    value={details.ownerName}
                    onChange={(e) => setDetails({ ...details, ownerName: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-black focus:bg-white transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={details.phone}
                    onChange={(e) => setDetails({ ...details, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-black focus:bg-white transition-colors font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">City / Location Zone</label>
                  <input
                    type="text"
                    value={details.city}
                    onChange={(e) => setDetails({ ...details, city: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-black focus:bg-white transition-colors"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1">Full Address</label>
                  <input
                    type="text"
                    value={details.address}
                    onChange={(e) => setDetails({ ...details, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-black focus:bg-white transition-colors"
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* Step 2: Hours */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Operating Schedule</h2>
                <p className="text-xs text-gray-500 mt-1">Set opening and closing times for live queue availability.</p>
              </div>

              <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
                {hours.map((h, idx) => (
                  <div key={h.day} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100 text-xs">
                    <div className="flex items-center gap-3 w-32">
                      <input
                        type="checkbox"
                        checked={h.isOpen}
                        onChange={(e) => {
                          const updated = [...hours]
                          updated[idx].isOpen = e.target.checked
                          setHours(updated)
                        }}
                        className="rounded border-gray-300 text-black focus:ring-black"
                      />
                      <span className={`font-semibold ${h.isOpen ? 'text-gray-900' : 'text-gray-400'}`}>
                        {h.day}
                      </span>
                    </div>
                    {h.isOpen ? (
                      <div className="flex items-center gap-2 font-mono">
                        <input
                          type="text"
                          value={h.open}
                          onChange={(e) => {
                            const updated = [...hours]
                            updated[idx].open = e.target.value
                            setHours(updated)
                          }}
                          className="w-24 px-2 py-1 bg-white border border-gray-200 rounded text-center text-xs"
                        />
                        <span className="text-gray-400">to</span>
                        <input
                          type="text"
                          value={h.close}
                          onChange={(e) => {
                            const updated = [...hours]
                            updated[idx].close = e.target.value
                            setHours(updated)
                          }}
                          className="w-24 px-2 py-1 bg-white border border-gray-200 rounded text-center text-xs"
                        />
                      </div>
                    ) : (
                      <span className="text-gray-400 font-mono uppercase text-[10px]">Closed</span>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Services */}
          {step === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Services & Pricing Menu</h2>
                <p className="text-xs text-gray-500 mt-1">Add initial service catalog items.</p>
              </div>

              <form onSubmit={handleAddService} className="grid grid-cols-1 sm:grid-cols-4 gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <input
                  type="text"
                  placeholder="Service Name"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="sm:col-span-2 px-3 py-2 bg-white border border-gray-200 rounded text-xs focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="Price (₹)"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: e.target.value })}
                  className="px-3 py-2 bg-white border border-gray-200 rounded text-xs focus:outline-none font-mono"
                />
                <button
                  type="submit"
                  className="px-3 py-2 bg-black text-white text-xs font-semibold rounded hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </form>

              <div className="space-y-2 max-h-56 overflow-y-auto">
                {servicesList.map((svc, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg text-xs">
                    <span className="font-semibold text-gray-900">{svc.name}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-gray-600">₹{svc.price} ({svc.duration} min)</span>
                      <button
                        onClick={() => setServicesList(servicesList.filter((_, i) => i !== idx))}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 4: Staff */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Staff & Stylist Chairs</h2>
                <p className="text-xs text-gray-500 mt-1">Configure active staff members for queue management.</p>
              </div>

              <form onSubmit={handleAddStaff} className="flex items-center gap-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                <input
                  type="text"
                  placeholder="Staff Member Name"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({ ...newStaff, name: e.target.value })}
                  className="flex-1 px-3 py-2 bg-white border border-gray-200 rounded text-xs focus:outline-none"
                />
                <select
                  value={newStaff.role}
                  onChange={(e) => setNewStaff({ ...newStaff, role: e.target.value })}
                  className="px-3 py-2 bg-white border border-gray-200 rounded text-xs focus:outline-none"
                >
                  <option value="Senior Stylist">Senior Stylist</option>
                  <option value="Color Specialist">Color Specialist</option>
                  <option value="Junior Barber">Junior Barber</option>
                </select>
                <button
                  type="submit"
                  className="px-3 py-2 bg-black text-white text-xs font-semibold rounded hover:bg-neutral-800 transition-colors flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add
                </button>
              </form>

              <div className="space-y-2 max-h-56 overflow-y-auto">
                {staffList.map((st, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-white border border-gray-200 rounded-lg text-xs">
                    <div className="flex items-center gap-2.5">
                      <div className="w-6 h-6 rounded-full bg-gray-100 font-mono font-medium flex items-center justify-center text-[10px]">
                        {st.name[0]}
                      </div>
                      <span className="font-semibold text-gray-900">{st.name}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-gray-500">{st.role}</span>
                      <button
                        onClick={() => setStaffList(staffList.filter((_, i) => i !== idx))}
                        className="text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Wizard Footer Controls */}
        <div className="mt-8 pt-4 border-t border-gray-100 flex items-center justify-between">
          <button
            onClick={() => setStep(s => Math.max(1, s - 1))}
            disabled={step === 1}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-gray-600 hover:text-black disabled:opacity-30 disabled:pointer-events-none transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back
          </button>

          {step < 4 ? (
            <button
              onClick={() => setStep(s => Math.min(4, s + 1))}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-black text-white text-xs font-semibold rounded-lg hover:bg-neutral-800 transition-colors shadow-xs"
            >
              Continue <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => navigate('dashboard')}
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-emerald-600 text-white text-xs font-semibold rounded-lg hover:bg-emerald-700 transition-colors shadow-md"
            >
              Launch Salon Dashboard <Sparkles className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
