# SamadhanSetu

## Societal Innovation Collaboration Platform — SIH 2026

**Problem Statement:** SIH26043  
**Domain:** Societal Innovation / Civic Technology  
**Geographic Focus:** Jharkhand

> **SamadhanSetu connects community problems with government action, academic expertise, student innovation and industry support to turn local problems into measurable real-world solutions.**

---

## 📌 Overview

**SamadhanSetu** is a full-stack societal innovation collaboration platform developed for the Smart India Hackathon 2026.

The platform is designed around a simple idea:

```text
Citizen Problem
      ↓
AI Analysis
      ↓
Government Validation
      ↓
University / Faculty / Student Matching
      ↓
Industry Collaboration
      ↓
Project Development
      ↓
Pilot / Deployment
      ↓
Social Impact
```

Unlike a conventional complaint-management portal, SamadhanSetu treats community problems as potential innovation opportunities.

A citizen can report a problem from a specific location in Jharkhand, provide supporting evidence, and track what happens next. Government users can review and validate submissions, while universities, faculty, students and industry partners can participate in solving suitable challenges.

---

# 🎯 Objectives

SamadhanSetu aims to:

- Provide citizens with a simple way to report community problems.
- Capture accurate Jharkhand location information.
- Use AI to analyze and prioritize submitted problems.
- Help government authorities review and validate challenges.
- Connect validated problems with universities and research capabilities.
- Enable student and faculty participation in solution development.
- Provide opportunities for industry collaboration and implementation support.
- Track solutions from problem submission to deployment.
- Measure social impact after deployment.
- Provide role-specific experiences through RBAC.
- Make civic innovation transparent and collaborative.

---

# ⭐ Key Features

## Citizen Problem Reporting

Citizens can submit:

- Problem title
- Problem description
- Category
- District
- Block
- Village
- Address
- GPS coordinates
- Expected outcome
- Supporting images/evidence

After submission, the system provides a confirmation containing the report ID and current status.

---

## 📍 Complete Jharkhand Location Coverage

The application uses a canonical dataset covering all **24 districts of Jharkhand**.

```text
Bokaro
Chatra
Deoghar
Dhanbad
Dumka
East Singhbhum
Garhwa
Giridih
Godda
Gumla
Hazaribagh
Jamtara
Khunti
Koderma
Latehar
Lohardaga
Pakur
Palamu
Ramgarh
Ranchi
Sahibganj
Seraikela-Kharsawan
Simdega
West Singhbhum
```

The reporting hierarchy is:

```text
District
   ↓
Block
   ↓
Village
   ↓
Address
   ↓
GPS Coordinates
```

Blocks are dynamically populated according to the selected district.

---

# 🗺️ Jharkhand District Map

The landing page contains an interactive Jharkhand district map.

The map is intended to provide:

- All Jharkhand districts
- District-level visualization
- Hover information on desktop
- Tap/click interaction on mobile
- District statistics
- Challenge information
- Project information
- Citizen engagement information
- Impact-related information

Conceptual interaction:

```text
District Hover / Click
        ↓
District Identifier
        ↓
District Data
        ↓
Information Card
```

---

# 🤖 AI-Powered Problem Analysis

SamadhanSetu integrates an AI layer for problem analysis.

The AI workflow can assist with:

- Problem classification
- Priority analysis
- Keyword extraction
- Required skills
- Solution/research matching
- Challenge understanding

```text
Citizen Description
        ↓
AI Analysis
        ↓
Problem Classification
        ↓
Priority / Insights
        ↓
Required Skills
        ↓
Potential Collaboration
```

AI output supports decision-making; final administrative actions remain controlled by authorized users.

---

# 🏛️ Government Command Center

Government users receive a dedicated operational experience.

The government workflow includes:

```text
New Submission
      ↓
Pending Review
      ↓
AI Analysis
      ↓
Government Validation
      ↓
Priority / Action
      ↓
Matching
      ↓
Project
      ↓
Progress Tracking
      ↓
Deployment
      ↓
Impact
```

The government dashboard is intended to provide:

- Total reports
- Pending review
- High-priority reports
- Validated challenges
- Active projects
- District activity
- Citizen engagement
- Project progress
- Analytics
- Report review and status management

Government users should not be treated as normal citizens.

---

# 👥 Role-Based Access Control

SamadhanSetu supports the following roles:

| Role | Main Responsibility |
|---|---|
| **Citizen** | Report problems, track reports and participate in community feedback |
| **Government** | Review, validate, prioritize and monitor challenges |
| **University** | Discover challenges and participate in R&D |
| **Faculty** | Mentor teams and supervise projects |
| **Student** | Participate in innovation and project activities |
| **Industry** | Provide expertise, resources and implementation support |
| **Admin** | Platform administration and system management |

### Role Dashboard Routing

```text
citizen
   → Citizen Dashboard

government
   → Government Command Center

university
   → University Dashboard

faculty
   → Faculty Dashboard

student
   → Student Dashboard

industry
   → Industry Dashboard

admin
   → Admin Dashboard
```

A student's authenticated session must route to the student dashboard and must not incorrectly open the citizen dashboard.

---

# 🔐 Authentication Architecture

SamadhanSetu uses authenticated sessions with JWT-based authorization.

```text
REGISTER / LOGIN
       ↓
Backend Authentication
       ↓
JWT
       ↓
Authenticated User
       ↓
User Role
       ↓
Role-Aware Frontend
       ↓
Backend Authorization
```

Frontend role checks control navigation and user experience.

Backend authorization remains the security boundary.

For example:

```text
Student
   ✕
Government Dashboard

Citizen
   ✕
Admin Dashboard
```

Unauthorized access should result in a controlled unauthorized response/page.

---

# 🔒 Registration Security

Public registration is intended for non-privileged platform roles such as:

- Citizen
- University
- Faculty
- Student
- Industry

Government and administrative access should be provisioned through the appropriate secure process rather than unrestricted public registration.

---

# 📋 Report Lifecycle

The platform follows a structured problem lifecycle.

```text
SUBMITTED
    ↓
AI ANALYZED
    ↓
PENDING REVIEW
    ↓
VALIDATED
    ↓
MATCHED
    ↓
PROJECT CREATED
    ↓
IN PROGRESS
    ↓
PROTOTYPE / PILOT
    ↓
DEPLOYED
    ↓
COMPLETED
```

The exact allowed transitions are controlled by backend business rules and role permissions.

---

# 👍 Community Engagement — "I Faced This Problem"

Citizens can indicate that they have personally experienced a reported problem.

Expected flow:

```text
User clicks "I Faced This Problem"
          ↓
Authenticated API request
          ↓
Backend identifies user + report
          ↓
Duplicate interaction check
          ↓
Interaction persisted
          ↓
Updated count returned
          ↓
Frontend updates
```

The frontend must not simply increment a number locally.

A user should not be able to increase the same report's count repeatedly.

---

# 🖼️ Evidence Upload & Cloudinary

SamadhanSetu supports image/evidence uploads for problem reports.

Cloudinary is used for image storage.

```text
Frontend Upload
      ↓
Backend
      ↓
Cloudinary
      ↓
Image URL
      ↓
Report Data
```

Environment variables are used for Cloudinary configuration:

```env
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

The Cloudinary API secret must remain on the backend and must never be exposed in frontend JavaScript.

---

# 🧠 Frontend Architecture

The frontend is implemented using web technologies and is designed around reusable styling, JavaScript utilities, role-specific pages and centralized API communication.

The major frontend responsibilities are:

```text
UI
 ↓
User Interaction
 ↓
Authentication State
 ↓
Role-Based Navigation
 ↓
API Client
 ↓
Backend
```

Important frontend areas include:

- Landing page
- Authentication
- Registration
- Citizen dashboard
- Government dashboard
- University dashboard
- Faculty dashboard
- Student dashboard
- Industry dashboard
- Admin dashboard
- Report submission
- Report details
- My Reports
- Profile
- Analytics
- Project workspace
- Notifications
- Interactive Jharkhand map

---

# 🖥️ Backend Architecture

The backend provides the application's business logic, APIs, authentication, authorization and integrations.

Conceptual architecture:

```text
                    FRONTEND
                       │
                       │ HTTPS / REST
                       ▼
                ┌──────────────┐
                │   Express    │
                │    Server    │
                └──────┬───────┘
                       │
          ┌────────────┼────────────┐
          │            │            │
          ▼            ▼            ▼
       Routes      Middleware    Services
          │            │            │
          │       JWT / RBAC       │
          │                        │
          └────────────┬───────────┘
                       ▼
                  Controllers
                       │
                       ▼
                    Models
                       │
                       ▼
                    MongoDB

External Services:
   ├── Groq AI
   └── Cloudinary
```

The backend is responsible for enforcing business rules instead of relying on frontend validation alone.

---

# 🗄️ Database Architecture

MongoDB is used as the primary application database.

The database stores application entities such as:

```text
Users
Reports / Challenges
Projects
Interactions
Status Information
Profile Information
Other platform-specific records
```

The exact collection/model structure is defined by the backend implementation.

Conceptually:

```text
User
 │
 ├── Role
 ├── Profile
 └── Submitted Reports
          │
          ├── Location
          ├── Evidence
          ├── AI Analysis
          ├── Status
          ├── Interactions
          └── Project / Matching
```

---

# 🔌 API Architecture

Frontend requests are routed through the backend REST API.

Conceptual request flow:

```text
HTML / JavaScript Page
        ↓
API Client
        ↓
Authorization Header
        ↓
Express Route
        ↓
Authentication Middleware
        ↓
Role / Permission Middleware
        ↓
Controller
        ↓
Service / Model
        ↓
MongoDB / Groq / Cloudinary
```

The API layer handles:

- Authentication
- User information
- Report submission
- Report retrieval
- Report interactions
- Status management
- Dashboard data
- Analytics
- Image uploads
- AI processing
- Role-protected operations

---

# 📁 Project Structure

The project is organized into frontend and backend applications.

```text
SIH2026/
│
├── frontend/
│   ├── HTML pages
│   ├── CSS
│   ├── JavaScript
│   ├── components
│   ├── data
│   └── assets
│
├── backend/
│   ├── server/application entry
│   ├── routes
│   ├── controllers
│   ├── models
│   ├── middleware
│   ├── services
│   ├── configuration
│   └── tests
│
├── documentation/
│   └── project / phase documentation
│
└── README.md
```

> The project may contain additional implementation-specific files and directories. The structure above describes the major architectural boundaries rather than inventing filenames that are not part of the implementation.

---

# 🎨 Frontend Design

The frontend follows a modern civic-tech interface focused on:

- Trust
- Accessibility
- Clarity
- Government credibility
- Community participation
- Data visualization

The design uses a light interface with blue/navy primary visual language, neutral surfaces and accent colors for priority and status information.

---

# 📱 Responsive Design

SamadhanSetu is designed for:

- Mobile phones
- Tablets
- Laptops
- Desktop monitors

Responsive behavior includes:

- Mobile navigation
- Responsive dashboards
- Stacked forms
- Responsive cards
- Mobile-friendly report views
- Responsive analytics
- Touch-friendly controls
- Mobile map interaction
- Responsive image upload
- Responsive authentication

The goal is not simply to shrink the desktop UI but to provide a usable touch-first experience on smaller screens.

---

# 📊 Analytics & Impact

The platform can surface data such as:

- Report volume
- District activity
- Challenge categories
- Priority distribution
- Active projects
- Citizen engagement
- University participation
- Industry collaboration
- Deployment progress
- Social impact

Dynamic production values should come from backend data rather than hardcoded fake metrics.

---

# 🔗 Deployment Architecture

SamadhanSetu uses separate frontend and backend deployments.

### Frontend — Netlify

```text
https://smadhansetu.netlify.app/
```

### Backend — Render

```text
https://sih2026-nx0u.onrender.com
```

### Production Flow

```text
                     USER
                      │
                      ▼
            ┌──────────────────┐
            │     NETLIFY      │
            │   SamadhanSetu   │
            │    Frontend      │
            └────────┬─────────┘
                     │
                     │ HTTPS API
                     ▼
            ┌──────────────────┐
            │      RENDER      │
            │ Node.js Backend  │
            └────────┬─────────┘
                     │
        ┌────────────┼────────────┐
        │            │            │
        ▼            ▼            ▼
    MongoDB       Cloudinary     Groq AI
```

---

# 💻 Local Development

Local development remains supported independently from production.

Conceptually:

```text
Local Frontend
      ↓
Local Backend
      ↓
MongoDB / Development Services
```

Production:

```text
Netlify
   ↓
Render
   ↓
Production Services
```

Environment-aware configuration should be used so local development does not depend on the deployed frontend/backend.

---

# ⚙️ Environment Variables

Sensitive configuration belongs in environment files and deployment environment settings.

Typical backend variables include:

```env
PORT=
MONGODB_URI=
JWT_SECRET=

GROQ_API_KEY=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

Do not commit real secrets to Git.

A `.env.example` file should contain variable names without real credentials.

---

# 🧪 Testing & Quality Assurance

The project has been developed with automated and manual validation.

Important test areas include:

```text
Authentication
RBAC
API functionality
Report submission
Location hierarchy
Cloudinary integration
Report interactions
Frontend routes
Frontend assets
Dashboard functionality
Responsive behavior
```

The project has previously achieved:

- Backend automated test suites passing
- Frontend route and asset audits passing
- Zero broken frontend references during validated phases
- `npm audit` with no reported vulnerabilities during the validated phase

Always run the current project's test commands before claiming a new build is production-ready.

---

# 🛡️ Security Principles

SamadhanSetu follows these principles:

1. Authentication is handled by the backend.
2. Backend authorization is the security boundary.
3. JWTs are required for protected operations.
4. Government and admin operations are role-protected.
5. Frontend role information must not be trusted for authorization.
6. Cloudinary secrets remain server-side.
7. User input is validated.
8. Uploaded files are validated.
9. Duplicate community interactions are prevented.
10. Production services use HTTPS.
11. Secrets are stored through environment variables.
12. Sensitive credentials are never committed to Git.

---

# 🧰 Technology Stack

## Frontend

- HTML5
- CSS3
- JavaScript
- Responsive CSS
- Fetch API
- Netlify

## Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- Role-Based Access Control
- Jest-based automated testing

## Database

- MongoDB
- Mongoose

## AI

- Groq API
- AI-powered problem analysis
- Priority/triage support
- Keyword and skill analysis
- Matching assistance

## Image Storage

- Cloudinary

## Deployment

- Netlify — Frontend
- Render — Backend

---

# 🚀 Local Setup

## 1. Clone the repository

```bash
git clone <repository-url>
cd SIH2026
```

## 2. Install backend dependencies

```bash
cd backend
npm install
```

## 3. Configure environment variables

Create the backend environment file:

```text
backend/.env
```

Add the required credentials:

```env
PORT=<your-port>
MONGODB_URI=<your-mongodb-uri>
JWT_SECRET=<your-jwt-secret>
GROQ_API_KEY=<your-groq-api-key>
CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
CLOUDINARY_API_KEY=<your-cloudinary-api-key>
CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
```

Never commit the actual `.env` file.

## 4. Start the backend

Use the start command defined in the backend `package.json`.

For example:

```bash
npm start
```

or the project's development command.

## 5. Start the frontend

Serve the `frontend/` directory using:

- VS Code Live Server
- `http-server`
- Another static web server

Example:

```bash
npx http-server frontend
```

---

# 🌐 Production

### Frontend

**Netlify**

https://smadhansetu.netlify.app/

### Backend

**Render**

https://sih2026-nx0u.onrender.com

The frontend communicates with the deployed backend through HTTPS API requests.

---

# 🔄 End-to-End System Flow

```text
                         SAMADHANSETU
                              │
                              ▼
                         USER LOGIN
                              │
                              ▼
                         ROLE CHECK
                              │
          ┌───────────────────┼───────────────────┐
          │                   │                   │
       CITIZEN            GOVERNMENT          INSTITUTIONS
          │                   │                   │
          ▼                   ▼                   ▼
   Report Problem       Review Reports      Discover Challenges
          │                   │                   │
          └──────────────┬────┴───────────────────┘
                         ▼
                    AI ANALYSIS
                         │
                         ▼
                  VALIDATION / MATCHING
                         │
                         ▼
                  COLLABORATIVE PROJECT
                         │
                         ▼
                    DEVELOPMENT
                         │
                         ▼
                  PILOT / DEPLOYMENT
                         │
                         ▼
                    SOCIAL IMPACT
```

---

# 💡 Why SamadhanSetu?

Traditional complaint systems generally stop after:

```text
Problem → Complaint → Department
```

SamadhanSetu extends the lifecycle:

```text
Problem
   ↓
Understand
   ↓
Analyze
   ↓
Validate
   ↓
Match Expertise
   ↓
Collaborate
   ↓
Build
   ↓
Deploy
   ↓
Measure Impact
```

This creates a structured bridge between citizens, government, academia and industry.

---

# 🏆 Smart India Hackathon 2026

| Field | Details |
|---|---|
| Platform | **SamadhanSetu** |
| Problem Statement | **SIH26043** |
| Event | **Smart India Hackathon 2026** |
| Domain | **Societal Innovation / Civic Technology** |
| Geographic Focus | **Jharkhand** |

---

## Vision

> **From Community Problems to Collaborative Solutions.**

SamadhanSetu aims to make societal problems:

**Discoverable → Actionable → Collaborative → Deployable → Measurable**

