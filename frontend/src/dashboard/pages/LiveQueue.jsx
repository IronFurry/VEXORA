import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Play, 
  CheckCircle2, 
  XCircle, 
  ArrowUp, 
  UserPlus, 
  Search, 
  Filter, 
  Clock, 
  User, 
  Scissors, 
  Sparkles,
  X
} from 'lucide-react'
import { useDashboard } from '../../context/DashboardContext'

export const LiveQueue = () => {
  const { queue, staff, services, startService, completeService, cancelService, moveUp, addCustomer } = useDashboard()
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)

  // Form state
  const [customerName, setCustomerName] = useState('')
  const [selectedService, setSelectedService] = useState(services[0]?.name || 'Haircut & Styling')
  const [selectedStaff, setSelectedStaff] = useState(staff[0]?.name || 'Rahul Sharma')

  const filteredQueue = queue.filter(item => {
    const matchesSearch = item.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.assignedStaff.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleAddSubmit = (e) => {
    e.preventDefault()
    if (!customerName.trim()) return
    addCustomer(customerName.trim(), selectedService, selectedStaff)
    setCustomerName('')
    setIsAddModalOpen(false)
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'in-service':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
            In Service
          </span>
        )
      case 'waiting':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <Clock className="w-3 h-3" />
            Waiting
          </span>
        )
      case 'cancelled':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-red-50 text-red-700 border border-red-200">
            <XCircle className="w-3 h-3" />
            Cancelled
          </span>
        )
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
            <CheckCircle2 className="w-3 h-3" />
            Completed
          </span>
        )
      default:
        return null
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-100">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 tracking-tight">Live Queue Management</h2>
          <p className="text-xs text-gray-500 mt-1 font-mono">
            {queue.filter(q => q.status === 'in-service').length} Active Chairs · {queue.filter(q => q.status === 'waiting').length} Waiting
          </p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-black text-white text-xs font-medium rounded-lg hover:bg-neutral-800 transition-colors shadow-sm"
        >
          <UserPlus className="w-4 h-4" />
          Add Walk-in Customer
        </button>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search customer, service, staff..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-black focus:bg-white transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-gray-400 shrink-0" />
          {['all', 'in-service', 'waiting', 'completed', 'cancelled'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors capitalize ${
                statusFilter === status
                  ? 'bg-gray-900 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {status.replace('-', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Queue Table */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-gray-600">
            <thead className="bg-gray-50 text-gray-500 font-mono border-b border-gray-200 uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3.5 px-4 font-semibold">#</th>
                <th className="py-3.5 px-4 font-semibold">Customer</th>
                <th className="py-3.5 px-4 font-semibold">Service</th>
                <th className="py-3.5 px-4 font-semibold">Assigned Staff</th>
                <th className="py-3.5 px-4 font-semibold">Status</th>
                <th className="py-3.5 px-4 font-semibold">Est. Wait</th>
                <th className="py-3.5 px-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-sans">
              <AnimatePresence initial={false}>
                {filteredQueue.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-400">
                      No customer records matching criteria.
                    </td>
                  </tr>
                ) : (
                  filteredQueue.map((item, index) => (
                    <motion.tr
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 4 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, height: 0 }}
                      className="hover:bg-gray-50/60 transition-colors"
                    >
                      <td className="py-4 px-4 font-mono font-bold text-gray-900">
                        #{item.id}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2.5">
                          <div className="w-7 h-7 rounded-full bg-gray-100 border border-gray-200 flex items-center justify-center font-mono font-medium text-gray-700 text-xs">
                            {item.customerName[0]}
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900">{item.customerName}</div>
                            <div className="text-[10px] text-gray-400 font-mono">Token: VX-{item.id + 100}</div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 font-medium text-gray-800">
                        <div className="flex items-center gap-1.5">
                          <Scissors className="w-3.5 h-3.5 text-gray-400" />
                          {item.service}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-1.5 text-gray-700">
                          <User className="w-3.5 h-3.5 text-gray-400" />
                          {item.assignedStaff}
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {getStatusBadge(item.status)}
                      </td>
                      <td className="py-4 px-4 font-mono text-gray-600">
                        {item.status === 'in-service' ? (
                          <span className="text-blue-600 font-semibold">Active now</span>
                        ) : item.status === 'waiting' ? (
                          `${item.estimatedWait} mins`
                        ) : (
                          '—'
                        )}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {item.status === 'waiting' && (
                            <>
                              <button
                                onClick={() => startService(item.id, item.assignedStaff)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-black text-white rounded text-[11px] font-medium hover:bg-neutral-800 transition-colors"
                                title="Start Service"
                              >
                                <Play className="w-3 h-3 fill-current" />
                                Start
                              </button>
                              <button
                                onClick={() => moveUp(item.id)}
                                disabled={index === 0}
                                className="p-1 text-gray-500 hover:text-black hover:bg-gray-100 rounded disabled:opacity-30 disabled:pointer-events-none transition-colors"
                                title="Move up in queue"
                              >
                                <ArrowUp className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => cancelService(item.id)}
                                className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Cancel Ticket"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}

                          {item.status === 'in-service' && (
                            <>
                              <button
                                onClick={() => completeService(item.id)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-600 text-white rounded text-[11px] font-medium hover:bg-emerald-700 transition-colors"
                                title="Complete Service"
                              >
                                <CheckCircle2 className="w-3 h-3" />
                                Complete
                              </button>
                              <button
                                onClick={() => cancelService(item.id)}
                                className="p-1 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                                title="Cancel Service"
                              >
                                <XCircle className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}

                          {(item.status === 'completed' || item.status === 'cancelled') && (
                            <span className="text-[11px] text-gray-400 font-mono uppercase tracking-wider">Archived</span>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Walk-in Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-xs">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-xl border border-gray-200 shadow-xl max-w-md w-full p-6 space-y-5"
            >
              <div className="flex items-center justify-between border-b border-gray-100 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">Add Walk-in Customer</h3>
                    <p className="text-[11px] text-gray-500">Insert new entry into live queue</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsAddModalOpen(false)}
                  className="text-gray-400 hover:text-black p-1 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleAddSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Customer Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Vikram Malhotra"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-black transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Select Service</label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-black transition-colors"
                  >
                    {services.map(s => (
                      <option key={s.id} value={s.name}>
                        {s.name} — ₹{s.price} ({s.duration} min)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">Assign Stylist / Staff</label>
                  <select
                    value={selectedStaff}
                    onChange={(e) => setSelectedStaff(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-xs focus:outline-none focus:border-black transition-colors"
                  >
                    {staff.map(st => (
                      <option key={st.id} value={st.name}>
                        {st.name} ({st.role})
                      </option>
                    ))}
                  </select>
                </div>

                <div className="pt-3 flex items-center justify-end gap-2 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="px-3 py-2 text-xs text-gray-600 font-medium hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-black text-white text-xs font-medium rounded-lg hover:bg-neutral-800 transition-colors shadow-xs"
                  >
                    Add to Queue
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
