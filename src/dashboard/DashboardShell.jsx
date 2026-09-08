import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  Users2, 
  Calendar, 
  Users, 
  Scissors, 
  List, 
  Package, 
  Star, 
  Tag, 
  BarChart3, 
  Settings, 
  Bell, 
  ArrowLeft, 
  Store, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  ChevronRight,
  LogOut
} from 'lucide-react'
import { useDashboard } from '../context/DashboardContext'
import { useNavigation } from '../context/NavigationContext'

// Import dashboard pages
import { Overview } from './pages/Overview'
import { LiveQueue } from './pages/LiveQueue'
import { Appointments } from './pages/Appointments'
import { Customers } from './pages/Customers'
import { Staff } from './pages/Staff'
import { Services } from './pages/Services'
import { Inventory } from './pages/Inventory'
import { Reviews } from './pages/Reviews'
import { Coupons } from './pages/Coupons'
import { Analytics } from './pages/Analytics'
import { Settings as SettingsPage } from './pages/Settings'

export const DashboardShell = () => {
  const [activeTab, setActiveTab] = useState('overview')
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const { notifications, queue } = useDashboard()
  const { navigate } = useNavigation()

  const navItems = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'queue', label: 'Live Queue', icon: Users2, badge: queue.filter(q => q.status === 'waiting' || q.status === 'in-service').length },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'staff', label: 'Staff & Chairs', icon: Scissors },
    { id: 'services', label: 'Services Catalog', icon: List },
    { id: 'inventory', label: 'Inventory', icon: Package },
    { id: 'reviews', label: 'Reviews & Feedback', icon: Star },
    { id: 'coupons', label: 'Coupons & Offers', icon: Tag },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'settings', label: 'Salon Settings', icon: Settings },
  ]

  const renderActivePage = () => {
    switch (activeTab) {
      case 'overview': return <Overview />
      case 'queue': return <LiveQueue />
      case 'appointments': return <Appointments />
      case 'customers': return <Customers />
      case 'staff': return <Staff />
      case 'services': return <Services />
      case 'inventory': return <Inventory />
      case 'reviews': return <Reviews />
      case 'coupons': return <Coupons />
      case 'analytics': return <Analytics />
      case 'settings': return <SettingsPage />
      default: return <Overview />
    }
  }

  const activeNav = navItems.find(item => item.id === activeTab)

  return (
    <div className="vex-dash-layout min-h-screen bg-gray-50 flex text-gray-900 font-sans selection:bg-black selection:text-white">
      {/* Fixed Sidebar */}
      <aside className="vex-dash-sidebar w-64 bg-white border-r border-gray-200 flex flex-col fixed inset-y-0 left-0 z-30 shadow-xs">
        {/* Brand Header */}
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-black text-white flex items-center justify-center font-bold font-mono tracking-wider text-sm shadow-xs">
              VX
            </div>
            <div>
              <span className="font-mono font-bold tracking-tight text-sm text-gray-900 block leading-tight">
                VEXORA
              </span>
              <span className="text-[10px] text-gray-400 font-mono uppercase tracking-widest block">
                Salon Partner OS
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          <div className="px-3 pb-2 text-[10px] font-mono font-semibold text-gray-400 uppercase tracking-wider">
            Management
          </div>
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.id
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${
                  isActive
                    ? 'bg-black text-white shadow-xs'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100/70'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-semibold ${
                    isActive ? 'bg-white text-black' : 'bg-gray-200 text-gray-800'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        {/* Salon Profile Footer */}
        <div className="p-3 border-t border-gray-100 bg-gray-50/50">
          <div className="flex items-center justify-between p-2.5 bg-white rounded-lg border border-gray-200 shadow-2xs">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-md bg-gray-900 text-white flex items-center justify-center font-semibold text-xs shrink-0">
                L
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-900 truncate">Looks & Co. Studio</p>
                <p className="text-[10px] text-gray-500 font-mono truncate">4 Stations · Delhi</p>
              </div>
            </div>
            <button
              onClick={() => navigate('landing')}
              title="Exit to VEXORA Main Website"
              className="p-1.5 text-gray-400 hover:text-black hover:bg-gray-100 rounded transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Workspace Content */}
      <div className="vex-dash-main flex-1 pl-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="vex-dash-topbar h-16 bg-white border-b border-gray-200 px-8 flex items-center justify-between sticky top-0 z-20 shadow-2xs">
          <div className="flex items-center gap-3">
            <h1 className="text-base font-semibold text-gray-900 tracking-tight">
              {activeNav?.label || 'Dashboard'}
            </h1>
            <span className="text-gray-300 font-light">|</span>
            <span className="text-xs font-mono text-gray-500">Live Operating Mode</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Back to site button */}
            <button
              onClick={() => navigate('landing')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-600 hover:text-black border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Back to VEXORA</span>
            </button>

            {/* Notifications Menu */}
            <div className="relative">
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="relative p-2 text-gray-600 hover:text-black hover:bg-gray-100 rounded-lg transition-colors"
              >
                <Bell className="w-4 h-4" />
                {notifications.length > 0 && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white" />
                )}
              </button>

              <AnimatePresence>
                {isNotificationsOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute right-0 mt-2 w-80 bg-white rounded-xl border border-gray-200 shadow-xl py-2 z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between">
                      <span className="text-xs font-semibold text-gray-900">Notifications</span>
                      <span className="text-[10px] font-mono text-gray-400">{notifications.length} recent</span>
                    </div>
                    <div className="max-h-72 overflow-y-auto divide-y divide-gray-50">
                      {notifications.length === 0 ? (
                        <div className="py-8 text-center text-xs text-gray-400">No new alerts</div>
                      ) : (
                        notifications.map((notif) => (
                          <div key={notif.id} className="p-3 hover:bg-gray-50/80 transition-colors">
                            <div className="flex items-start justify-between gap-2">
                              <span className="text-xs font-semibold text-gray-900">{notif.title}</span>
                              <span className="text-[10px] font-mono text-gray-400 shrink-0">{notif.time}</span>
                            </div>
                            <p className="text-[11px] text-gray-500 mt-0.5 leading-snug">{notif.message}</p>
                          </div>
                        ))
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Dynamic Page Container */}
        <main className="flex-1 p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {renderActivePage()}
        </main>
      </div>
    </div>
  )
}
