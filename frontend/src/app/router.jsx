import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '../auth/ProtectedRoute';

// Public Pages
import { LandingPage } from '../pages/public/LandingPage';
import { ChallengesPage } from '../pages/public/ChallengesPage';
import { ChallengeDetailsPage } from '../pages/public/ChallengeDetailsPage';

// Auth Pages
import { LoginPage } from '../pages/auth/LoginPage';
import { RegisterPage } from '../pages/auth/RegisterPage';
import { UnauthorizedPage } from '../pages/auth/UnauthorizedPage';
import { PendingVerificationPage } from '../pages/auth/PendingVerificationPage';

// Citizen Pages
import { CitizenDashboard } from '../pages/citizen/CitizenDashboard';
import { ReportProblemPage } from '../pages/citizen/ReportProblemPage';

// Government Pages
import { GovernmentDashboard } from '../pages/government/GovernmentDashboard';

// University Pages
import { UniversityDashboard } from '../pages/university/UniversityDashboard';
import { UniversityTeamsPage } from '../pages/university/UniversityTeamsPage';

// Faculty Page (API-driven)
import { FacultyDashboard } from '../pages/faculty/FacultyDashboard';

// Student Page (API-driven)
import { StudentDashboard } from '../pages/student/StudentDashboard';

// Industry Pages
import { IndustryDashboard } from '../pages/industry/IndustryDashboard';

// Admin Pages (API-driven)
import { AdminDashboard } from '../pages/admin/AdminDashboard';

// Project Workspace Page (API-driven)
import { ProjectWorkspacePage } from '../pages/project/ProjectWorkspacePage';

// Analytics, Impact & Notifications Pages
import { AnalyticsDashboard } from '../pages/analytics/AnalyticsDashboard';
import { ImpactDashboard } from '../pages/impact/ImpactDashboard';
import { NotificationsPage } from '../pages/notifications/NotificationsPage';
import { ProfilePage } from '../pages/profile/ProfilePage';

export const AppRouter = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/challenges" element={<ChallengesPage />} />
      <Route path="/challenges/:id" element={<ChallengeDetailsPage />} />
      <Route path="/analytics" element={<AnalyticsDashboard />} />
      <Route path="/impact" element={<ImpactDashboard />} />

      {/* Auth Routes */}
      <Route path="/auth/login" element={<LoginPage />} />
      <Route path="/auth/register" element={<RegisterPage />} />
      <Route path="/auth/unauthorized" element={<UnauthorizedPage />} />
      <Route path="/auth/pending-verification" element={<PendingVerificationPage />} />

      {/* Citizen Protected Routes */}
      <Route path="/citizen/dashboard" element={<ProtectedRoute allowedRoles={['citizen', 'admin']}><CitizenDashboard /></ProtectedRoute>} />
      <Route path="/citizen/report" element={<ProtectedRoute><ReportProblemPage /></ProtectedRoute>} />
      <Route path="/citizen/reports" element={<ProtectedRoute><CitizenDashboard /></ProtectedRoute>} />

      {/* Government Protected Routes */}
      <Route path="/government/dashboard" element={<ProtectedRoute allowedRoles={['government', 'admin']}><GovernmentDashboard /></ProtectedRoute>} />

      {/* University Protected Routes */}
      <Route path="/university/dashboard" element={<ProtectedRoute allowedRoles={['university', 'admin']}><UniversityDashboard /></ProtectedRoute>} />
      <Route path="/university/teams" element={<ProtectedRoute allowedRoles={['university', 'admin']}><UniversityTeamsPage /></ProtectedRoute>} />

      {/* Faculty Protected Routes */}
      <Route path="/faculty/dashboard" element={<ProtectedRoute allowedRoles={['faculty', 'admin']}><FacultyDashboard /></ProtectedRoute>} />

      {/* Student Protected Routes */}
      <Route path="/student/dashboard" element={<ProtectedRoute allowedRoles={['student', 'admin']}><StudentDashboard /></ProtectedRoute>} />

      {/* Industry Protected Routes */}
      <Route path="/industry/dashboard" element={<ProtectedRoute allowedRoles={['industry', 'admin']}><IndustryDashboard /></ProtectedRoute>} />

      {/* Admin Protected Routes */}
      <Route path="/admin/dashboard" element={<ProtectedRoute allowedRoles={['admin']}><AdminDashboard /></ProtectedRoute>} />

      {/* Shared Protected Workspaces */}
      <Route path="/project/:id" element={<ProtectedRoute><ProjectWorkspacePage /></ProtectedRoute>} />
      <Route path="/notifications" element={<ProtectedRoute><NotificationsPage /></ProtectedRoute>} />
      <Route path="/profile" element={<ProtectedRoute><ProfilePage /></ProtectedRoute>} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
