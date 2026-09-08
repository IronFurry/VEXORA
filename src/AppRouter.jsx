import React from 'react'
import { NavigationProvider, useNavigation } from './context/NavigationContext'
import { DashboardProvider } from './context/DashboardContext'
import LandingPage from './App'
import { DashboardShell } from './dashboard/DashboardShell'
import { Onboarding } from './dashboard/Onboarding'

const MainRouter = () => {
  const { currentPage } = useNavigation()

  if (currentPage === 'dashboard') {
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
      <DashboardProvider>
        <MainRouter />
      </DashboardProvider>
    </NavigationProvider>
  )
}

export default AppRouter
