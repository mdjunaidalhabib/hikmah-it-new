import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { Toaster } from 'react-hot-toast'
import Navbar from './sections/Navbar'
import Footer from './sections/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ErrorBoundary from './components/ErrorBoundary'

import HomePage from './pages/HomePage'
import ServicesPage from './pages/ServicesPage'
import EcommercePage from './pages/EcommercePage'
import HostingPage from './pages/HostingPage'
import MadrasahPage from './pages/MadrasahPage'
import BusinessPage from './pages/BusinessPage'
import PricingPage from './pages/PricingPage'
import PortfolioPage from './pages/PortfolioPage'
import ContactPage from './pages/ContactPage'
import TeamPage from './pages/TeamPage'
import AboutPage from './pages/AboutPage'
import EarnPage from './pages/EarnPage'
import CheckoutPage from './pages/CheckoutPage'
import NotFoundPage from './pages/NotFoundPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import VerifyPendingPage from './pages/VerifyPendingPage'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ResetPasswordPage from './pages/ResetPasswordPage'
import ProfilePage from './pages/ProfilePage'

import { UserAuthProvider } from './context/UserAuthContext'
import RequireUserAuth from './components/RequireUserAuth'

import { AdminAuthProvider } from './admin/context/AdminAuthContext'
import RequireAdminAuth from './admin/components/RequireAdminAuth'
import AdminLayout from './admin/components/AdminLayout'
import AdminLogin from './admin/pages/AdminLogin'
import AdminForgotPassword from './admin/pages/AdminForgotPassword'
import AdminResetPassword from './admin/pages/AdminResetPassword'
import AdminDashboard from './admin/pages/AdminDashboard'
import PackagesManager from './admin/pages/PackagesManager'
import PurchasesManager from './admin/pages/PurchasesManager'
import PartnersManager from './admin/pages/PartnersManager'
import ContactMessages from './admin/pages/ContactMessages'
import PortfolioManager from './admin/pages/PortfolioManager'
import ServicesManager from './admin/pages/ServicesManager'
import TestimonialsManager from './admin/pages/TestimonialsManager'
import SiteSettingsPage from './admin/pages/SiteSettingsPage'
import UsersManager from './admin/pages/UsersManager'
import NotificationsDashboard from './admin/pages/NotificationsDashboard'
import TrashPage from './admin/pages/TrashPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo(0, 0) }, [pathname])
  return null
}

function AdminRoutes() {
  return (
    <AdminAuthProvider>
      <Routes>
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/forgot-password" element={<AdminForgotPassword />} />
        <Route path="/admin/reset-password/:token" element={<AdminResetPassword />} />
        <Route
          path="/admin"
          element={
            <RequireAdminAuth>
              <AdminLayout />
            </RequireAdminAuth>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="packages" element={<PackagesManager />} />
          <Route path="purchases" element={<PurchasesManager />} />
          <Route path="partners" element={<PartnersManager />} />
          <Route path="messages" element={<ContactMessages />} />
          <Route path="portfolio" element={<PortfolioManager />} />
          <Route path="services" element={<ServicesManager />} />
          <Route path="testimonials" element={<TestimonialsManager />} />
          <Route path="settings" element={<SiteSettingsPage />} />
          <Route path="users" element={<UsersManager />} />
          <Route path="notifications" element={<NotificationsDashboard />} />
          <Route path="trash" element={<TrashPage />} />
        </Route>
        <Route path="/admin/*" element={<NotFoundPage />} />
      </Routes>
    </AdminAuthProvider>
  )
}

function PublicRoutes() {
  const { pathname } = useLocation()
  return (
    <UserAuthProvider>
      <Navbar />
      <main>
        <ErrorBoundary key={pathname}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/ecommerce" element={<EcommercePage />} />
            <Route path="/hosting" element={<HostingPage />} />
            <Route path="/madrasah" element={<MadrasahPage />} />
            <Route path="/business" element={<BusinessPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/team" element={<TeamPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/earn" element={<EarnPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/forgot-password" element={<ForgotPasswordPage />} />
            <Route path="/reset-password" element={<ResetPasswordPage />} />
            <Route
              path="/verify"
              element={
                <RequireUserAuth>
                  <VerifyPendingPage />
                </RequireUserAuth>
              }
            />
            <Route
              path="/profile"
              element={
                <RequireUserAuth>
                  <ProfilePage />
                </RequireUserAuth>
              }
            />
            <Route
              path="/checkout/:packageId"
              element={
                <RequireUserAuth>
                  <CheckoutPage />
                </RequireUserAuth>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
      <WhatsAppButton />
    </UserAuthProvider>
  )
}

function AppRoutes() {
  const { pathname } = useLocation()
  return pathname.startsWith('/admin') ? <AdminRoutes /> : <PublicRoutes />
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="font-sans text-slate-950 antialiased">
        <ScrollToTop />
        <Toaster position="top-center" toastOptions={{ duration: 3500 }} />
        <AppRoutes />
      </div>
    </BrowserRouter>
  )
}
