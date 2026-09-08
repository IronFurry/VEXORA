import React from 'react'
import { NavigationProvider, useNavigation } from './context/NavigationContext'
import { AuthProvider, useAuth } from './context/AuthContext'
import { DashboardProvider } from './context/DashboardContext'
import LandingPage from './App'
import { DashboardShell } from './dashboard/DashboardShell'
import { Onboarding } from './dashboard/Onboarding'
import { LoginPage } from './components/LoginPage'

import { CustomerQueueProvider } from './context/CustomerQueueContext'

const MainRouter = () => {
  const { currentPage } = useNavigation()
  const { isAuthenticated } = useAuth()

  if (currentPage === 'login') {
    return <LoginPage />
  }

  if (currentPage === 'dashboard') {
    // If not authenticated, redirect to login page
    if (!isAuthenticated) {
      return <LoginPage />
    }
    return <DashboardShell />
  }

  if (currentPage === 'onboarding') {
    return <Onboarding />
  }

  return <LandingPage />
}

export const AppRouter = () => {
  return (
    <NavigationProvider>
      <AuthProvider>
        <DashboardProvider>
          <CustomerQueueProvider>
            <MainRouter />
          </CustomerQueueProvider>
        </DashboardProvider>
      </AuthProvider>
    </NavigationProvider>
  )
}

export default AppRouter
