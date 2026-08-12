import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import TermsConditionsPage from './pages/TermsConditionsPage'
import ContactPage from './pages/ContactPage'
import BlogPage from './pages/BlogPage'
import BlogPostPage from './pages/BlogPostPage'
import ReportAuditPage from './pages/ReportAuditPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
        <Route path="/terms-and-conditions" element={<TermsConditionsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/report-audit" element={<ReportAuditPage />} />
        <Route path="/report-audit/" element={<ReportAuditPage />} />
      </Routes>
    </BrowserRouter>
  )
}
