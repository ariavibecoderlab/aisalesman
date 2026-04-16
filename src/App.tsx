import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import LandingPage from './pages/LandingPage'
import SignupPage from './pages/SignupPage'
import SetupPage from './pages/SetupPage'
import DashboardPage from './pages/DashboardPage'

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, business, loading } = useAuth()
  const location = useLocation()

  if (loading) return <div className="min-h-screen flex items-center justify-center"><div className="text-4xl animate-pulse">🤖</div></div>
  if (!user) return <Navigate to="/signup" replace />
  if (!business && location.pathname !== '/setup') return <Navigate to="/setup" replace />
  if (business && location.pathname === '/setup') return <Navigate to="/dashboard" replace />
  return <>{children}</>
}

import { useLocation } from 'react-router-dom'

function AppRoutes() {
  const { user, business } = useAuth()

  if (user && business) {
    const loc = window.location.hash.replace('#', '') || '/dashboard'
    if (loc === '/' || loc === '/signup') return <Navigate to="/dashboard" replace />
  }

  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/setup" element={<ProtectedRoute><SetupPage /></ProtectedRoute>} />
      <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/products" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/chats" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/leads" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="/settings" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HashRouter>
  )
}
