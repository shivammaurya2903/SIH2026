# Societal Innovation Collaboration Platform (Backend API)
### Government of Jharkhand — Smart India Hackathon 2026

An enterprise-grade Node.js / Express backend powering a structured ecosystem across Jharkhand connecting **Citizens**, **Community Organizations**, **Panchayati Raj Institutions**, **Urban Local Bodies**, **Government Departments**, **Higher Education Institutions (Universities & Faculty)**, **Industries/MSMEs/Startups**, and **CSR Organizations**.

The platform captures real-world societal problems from citizens across Jharkhand, performs AI classification using the **Groq API (`llama-3.3-70b-versatile`)**, flags duplicates, connects validated challenges with academic institutions and industry partners, tracks multi-stage project deployment, and measures quantifiable social impact.

---

## 🏛️ System Architecture

```text
              Citizen Problem Submission
                          ↓
              /api/challenges (Create)
                          ↓
             Groq AI Analysis & Scoring
              /api/challenges/:id/analyze
                          ↓
         Duplicate Detection (Jaccard / Token)
                          ↓
     Government Review & Human Approval (Control Point)
              /api/challenges/:id/approve
                          ↓
     Intelligent University & Industry Matching
              /api/challenges/:id/matches
                          ↓
            University Solution Proposal
                   /api/proposals
                          ↓
      Proposal Approval & Project Link Creation
                   /api/projects
                          ↓
  Multi-Stage Deployment (Planning -> Pilot -> Deployed)
                          ↓
       Impact Metrics & Real-time Analytics
               /api/impact & /api/analytics
```

---

## 📂 Project Structure

```text
backend/
├── src/
│   ├── config/
│   │   ├── db.js              # Mongoose MongoDB connection handler
│   │   └── env.js             # Environment variable loader & validator
│   ├── controllers/
│   │   ├── analytics.controller.js    # MongoDB aggregation metrics
│   │   ├── auth.controller.js         # JWT Auth & Privilege Escalation Protection
│   │   ├── challenge.controller.js    # Challenge CRUD & AI trigger
│   │   ├── collaboration.controller.js# Industry-University request management
│   │   ├── impact.controller.js       # Social impact metric logs
│   │   ├── industry.controller.js     # Industry profile management
│   │   ├── notification.controller.js # Notification retrieval & read status
│   │   ├── project.controller.js      # Project lifecycle state transitions
│   │   ├── proposal.controller.js     # University solution proposals
│   │   ├── university.controller.js   # Institutional profiles & expertise
│   │   └── user.controller.js         # User profile management
│   ├── middleware/
│   │   ├── auth.middleware.js        # Bearer JWT verification
│   │   ├── error.middleware.js       # Centralized error handler (400, 401, 403, 404, 409, 422, 500)
│   │   ├── role.middleware.js        # Strict Role-Based Access Control (RBAC)
│   │   ├── upload.middleware.js      # Multer file type/extension/size safety filter
│   │   └── validation.middleware.js  # ObjectId & payload validators
│   ├── models/
│   │   ├── Challenge.js       # Challenge schema with Groq analysis & location
│   │   ├── Collaboration.js   # Industry-University collaboration model
│   │   ├── ImpactMetric.js    # Quantifiable societal impact metrics
│   │   ├── Industry.js        # Industry/MSME/CSR profile model
│   │   ├── Milestone.js       # Project milestone tracking schema
│   │   ├── Notification.js    # Notification inbox model
│   │   ├── Project.js         # Multi-stage project model
│   │   ├── Proposal.js        # Solution proposal model
│   │   ├── Team.js            # Multidisciplinary team model
│   │   ├── University.js      # Institutional profile model
│   │   └── User.js            # User model with bcrypt password hashing
│   ├── routes/
│   │   ├── analytics.routes.js
│   │   ├── auth.routes.js
│   │   ├── challenge.routes.js
│   │   ├── collaboration.routes.js
│   │   ├── impact.routes.js
│   │   ├── industry.routes.js
│   │   ├── notification.routes.js
│   │   ├── project.routes.js
│   │   ├── proposal.routes.js
│   │   ├── university.routes.js
│   │   └── user.routes.js
│   ├── services/
│   │   ├── ai.service.js          # Groq SDK SDK integration & Jaccard duplicate detection
│   │   ├── analytics.service.js   # MongoDB aggregation pipelines
│   │   ├── challenge.service.js   # Challenge data operations
│   │   ├── file.service.js        # File deletion & URL resolver
│   │   ├── matching.service.js    # University & Industry matching algorithms
│   │   └── notification.service.js# System notification trigger
│   ├── utils/
│   │   ├── constants.js       # System enums (Roles, Statuses, Categories)
│   │   ├── jwt.js             # Token sign & verify helper
│   │   └── response.js        # Standardized JSON response helpers
│   ├── app.js                 # Express application setup
│   └── server.js              # Server entry point
├── uploads/                   # Secure evidence uploads directory
├── .env.example               # Environment variables template
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables

Create `.env` inside `backend/`:

```env
PORT=5000
NODE_ENV=development

MONGODB_URI=mongodb://127.0.0.1:27017/societal_innovation

JWT_SECRET=your_long_random_jwt_secret_key
JWT_EXPIRES_IN=7d

GROQ_API_KEY=your_groq_api_key
AI_MODEL=llama-3.3-70b-versatile

CLIENT_URL=http://localhost:3000

MAX_FILE_SIZE=10485760
```

---

## 🤖 Groq AI Workflow & Security Controls

1. **SDK Integration**: Utilizes the official `@groq/groq-sdk` Node.js client.
2. **Structured Analysis**: Evaluates problem title, description, and location to yield:
   - `category` (Validated against Jharkhand problem domains: education, healthcare, agriculture, water, sanitation, environment, energy, urban_development, accessibility, public_administration, rural_livelihoods, infrastructure, other).
   - `severity` (`low`, `medium`, `high`, `critical`).
   - `priorityScore` (Normalized integer 0–100).
   - `keywords` & `requiredSkills`.
   - `summary` (Executive briefing).
3. **Duplicate Detection**: Uses token overlap and Jaccard similarity metrics against past challenges to store `isDuplicate`, `relatedChallenges`, and `similarityScore`.
4. **Human-in-the-Loop**: AI output is strictly advisory. Government approval (`/api/challenges/:id/approve`) is required before assignment.

---

## 🔒 User Roles & Access Control (RBAC)

Supported Roles: `citizen`, `government`, `university`, `faculty`, `student`, `industry`, `admin`.

- **Privilege Escalation Prevention**: Public self-registration (`POST /api/auth/register`) enforces unprivileged roles (`citizen`, `university`, `faculty`, `student`, `industry`). Registering directly as `admin` or `government` is blocked.
- **Challenge Operations**: Citizens manage their own challenges. Only `government` and `admin` roles can approve/reject challenges.
- **Proposals & Projects**: Universities/Faculty submit proposals. Government approves proposals, triggering automatic linking to active Project records.

---

## 🎯 Matching Algorithms

### University Matching (`matchUniversities`)
Calculates match score (0–100) based on:
- Academic departments
- Faculty expertise
- Research areas
- Laboratories & incubation facilities
- District proximity boost

### Industry Matching (`matchIndustries`)
Calculates match score (0–100) based on:
- Industry domains & technology stacks
- CSR interests & funding capabilities
- Prototyping/testing capabilities
- District proximity boost

---

## 📊 Main API Endpoints

| Endpoint | Method | Role | Description |
| :--- | :--- | :--- | :--- |
| `/api/health` | GET | Public | Server health status |
| `/api/auth/register` | POST | Public | Register user account |
| `/api/auth/login` | POST | Public | Authenticate user & return JWT |
| `/api/auth/me` | GET | Authenticated | Fetch current profile |
| `/api/challenges` | GET/POST | Auth / Public | List challenges / Submit new challenge |
| `/api/challenges/:id/analyze` | POST | Authenticated | Trigger Groq AI analysis & duplicate check |
| `/api/challenges/:id/matches` | GET | Authenticated | Compute University & Industry matches |
| `/api/challenges/:id/approve` | PATCH | Government/Admin | Approve challenge |
| `/api/challenges/:id/reject` | PATCH | Government/Admin | Reject challenge |
| `/api/proposals` | GET/POST | Auth / University | Submit & view solution proposals |
| `/api/proposals/:id/approve` | PATCH | Government/Admin | Approve proposal & link to project |
| `/api/projects` | GET/POST/PUT | Authenticated | Manage project lifecycle |
| `/api/collaborations` | GET/POST | Authenticated | Manage University-Industry collaborations |
| `/api/analytics/overview` | GET | Public | System-wide aggregation statistics |
| `/api/impact` | GET/POST | Auth | Record and query quantifiable social impact |

---

## 🚀 Running Locally

1. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Start Server (Development Mode)**:
   ```bash
   npm run dev
   ```

3. **Start Server (Production Mode)**:
   ```bash
   npm start
   ```
