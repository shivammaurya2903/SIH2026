# JharInnovate — Frontend Architecture & Structure Documentation
**Societal Innovation Collaboration Platform (SIH 2026)**

---

## 🏛️ Architecture Overview

The **JharInnovate** frontend is built as a clean, high-performance, government-grade Web Application adhering to the **Jharkhand Innovation Grid** design language. It connects Citizens, Universities, Faculty, Students, Industry Partners, and Government Officials into a unified innovation pipeline:

`COMMUNITY → PROBLEM → AI ANALYSIS → EXPERTISE → COLLABORATION → INNOVATION → IMPACT`

---

## 📁 Directory Structure

```
frontend/
├── index.html                           # Premium Public Landing Page
├── pages/
│   ├── login.html                       # Role-Based Auth Sign-In
│   ├── register.html                    # Public Registration (citizen, uni, faculty, student, industry)
│   ├── profile.html                     # User Profile Management
│   ├── unauthorized.html                # 403 Role Guard Error Page
│   ├── notifications.html               # Global System Notification Center
│   │
│   ├── citizen/
│   │   ├── dashboard.html               # Citizen Portal Dashboard
│   │   ├── challenges.html              # Submitted Community Issues List
│   │   ├── submit-challenge.html        # 5-Step Multi-Step Challenge Submission Form
│   │   └── challenge.html               # Detailed Information View & AI Priority Score Ring
│   │
│   ├── government/
│   │   ├── dashboard.html               # State Control Center with Real Analytics
│   │   ├── challenges.html              # Split-Screen AI Triage & Approve/Reject Panel
│   │   ├── proposals.html               # University Proposal Review & Approval
│   │   └── projects.html                # Statewide Active Solution Projects
│   │
│   ├── university/
│   │   ├── dashboard.html               # University Hub & 94% AI Match Recommendation
│   │   ├── challenges.html              # Approved Challenges Open for Proposal
│   │   ├── proposals.html               # Submitted Technical Proposals Tracker
│   │   ├── projects.html                # Active University Research Projects
│   │   └── teams.html                   # Student Teams & Faculty Mentorship Management
│   │
│   ├── faculty/
│   │   └── dashboard.html               # Mentorship & Assigned Project Oversight
│   │
│   ├── student/
│   │   └── dashboard.html               # Student Innovator Workspace & Task Deliverables
│   │
│   ├── industry/
│   │   ├── dashboard.html               # Industry CSR & R&D Marketplace
│   │   ├── opportunities.html           # Tech Capability & Funding Opportunity Matches
│   │   └── collaborations.html          # Partnership Request Management
│   │
│   ├── admin/
│   │   ├── dashboard.html               # Operational Health & API Diagnostics
│   │   └── users.html                   # User Account RBAC Control
│   │
│   ├── project/
│   │   └── workspace.html               # Polished 7-Stage Project Workspace Timeline
│   │
│   ├── analytics/
│   │   └── dashboard.html               # Statewide Interactive Analytics Charts
│   │
│   └── impact/
│       └── dashboard.html               # Quantified Social ROI & Impact Metric Dashboard
│
├── components/
│   ├── navbar.html                      # Reusable Top Navigation Bar
│   ├── sidebar.html                     # Reusable Role-Aware Navigation Sidebar
│   ├── footer.html                      # Reusable Application Footer
│   ├── modal.html                       # Reusable Confirmation Modal
│   └── notification.html                # Reusable Toast Notification Container
│
├── css/
│   ├── main.css                         # Global Resets & Typography Base Rules
│   ├── variables.css                    # Jharkhand Innovation Grid Design Tokens & Colors
│   ├── components.css                   # Buttons, Badges, Cards, Priority Ring, Tables
│   ├── layout.css                       # Application Shell Grid & Responsive Drawer
│   │
│   └── pages/                           # Page-Specific CSS Overlays
│       ├── landing.css
│       ├── auth.css
│       ├── dashboard.css
│       ├── challenge.css
│       ├── proposal.css
│       ├── project.css
│       ├── team.css
│       ├── analytics.css
│       └── impact.css
│
├── js/
│   ├── config.js                        # Environment Base URLs & Global Constants
│   ├── api.js                           # Centralized Fetch Wrapper (JWT, JSON, Multipart, 401/403)
│   ├── auth.js                          # JWT Session & RBAC Route Guard Engine
│   ├── navigation.js                    # Role-Based Sidebar Navigation Engine
│   ├── notifications.js                 # Unread Notification Polling & Badge Counter
│   ├── app.js                           # Global App Initializer & Component Loader
│   ├── challenge.js                     # Challenge CRUD & Groq AI Analysis Operations
│   ├── proposal.js                      # Technical Proposal Operations
│   ├── project.js                       # Project Workspace & Progress Operations
│   ├── team.js                          # Team & Mentorship Operations
│   ├── milestone.js                     # Milestone Deliverables Operations
│   ├── collaboration.js                 # Industry Collaboration Request Operations
│   ├── analytics.js                     # Analytics Endpoint Data Client
│   └── impact.js                        # Social Impact Endpoint Client
│
└── assets/
    ├── logo/                            # Official Platform Brand Asset Placeholders
    ├── icons/                           # UI Vector Icon Assets
    └── images/                          # Jharkhand Map & Visual Assets
```

---

## 🎨 Design System & Theme

- **Theme**: Premium Light Theme
- **Primary Color**: `#166534` (Deep Green)
- **Primary Light**: `#DCFCE7` (Light Green)
- **Accent**: `#F59E0B` (Amber)
- **Background**: `#F8FAFC` (Slate 50)
- **Surface**: `#FFFFFF` (Pure White)
- **Text**: `#0F172A` (Slate 900)
- **Border**: `#E2E8F0` (Slate 200)

---

## 🔐 Security & RBAC Enforcement

Public self-registration (`pages/register.html`) strictly limits user roles to:
- `citizen`
- `university`
- `faculty`
- `student`
- `industry`

Self-registration as `government` or `admin` is blocked on the frontend and strictly rejected by backend authorization controllers.

---

## ⚡ API Layer & Integration

All HTTP requests pass through `js/api.js`:
- Automatic injection of `Authorization: Bearer <JWT>` header
- Auto-redirection on `401 Unauthorized` session expiration
- Unified multipart/form-data support for file upload evidence
- Zero hardcoded fake analytics metrics (all metrics fetched from `/api/analytics` and `/api/impact`)

---

## 🚀 Running the Frontend

Serve the `frontend/` directory using any static web server (e.g., Live Server on port 5500, http-server, or nginx), and ensure the Node.js Express backend is running on `http://localhost:5000`.
