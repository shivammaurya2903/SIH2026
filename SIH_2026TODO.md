# IBVAP — SIH 2026 Two-Day Development TODO

**Project:** IBVAP — Intelligent Border Video Analytics Platform  
**Problem Statement:** SIH26187  
**Presentation:** 24 August 2026  
**Development Window:** 22–23 August  
**Testing + Deployment:** 4 hours  
**Primary Goal:** Build a reliable, fully functional AI-powered border-surveillance prototype for the SIH presentation.

---

## 1. Recommended Technology Stack

| Layer | Technology | Purpose |
|---|---|---|
| Frontend | React + Vite | Command-center dashboard |
| UI | Tailwind CSS | Professional surveillance UI |
| Charts | Recharts | Analytics |
| Maps | Leaflet | Camera/sector locations |
| Backend | FastAPI | REST APIs |
| Real-time | WebSocket | Live alerts/detections |
| AI | Python + OpenCV | Video processing |
| Object Detection | YOLO | Person/vehicle/object detection |
| Tracking | ByteTrack | Object tracking |
| ANPR | YOLO + PaddleOCR/EasyOCR | Number plate recognition |
| Database | PostgreSQL | Cameras/events/alerts |
| Cache | Redis | Real-time state/events |
| Video | RTSP + OpenCV/FFmpeg | CCTV ingestion |
| Authentication | JWT + RBAC | Admin/operator access |
| Deployment | Docker | Reproducible deployment |

---

# DAY 1 — Foundation + Core Product

## Block 1 — Project Setup
**Target: ~1 hour**

- [ ] Create `IBVAP` Git repository
- [ ] Create React + Vite frontend
- [ ] Create FastAPI backend
- [ ] Create `ai-engine`
- [ ] Create `.env.example`
- [ ] Configure Git
- [ ] Create initial README
- [ ] Verify frontend runs
- [ ] Verify backend runs
- [ ] Verify frontend → backend connection

### Target Structure

```text
IBVAP/
├── frontend/
├── backend/
├── ai-engine/
├── videos/
├── models/
├── docs/
└── README.md
```

---

## Block 2 — Command Dashboard
**Target: ~2 hours**

- [ ] Build sidebar
- [ ] Build header
- [ ] Add system status
- [ ] Add camera count
- [ ] Add active threat count
- [ ] Add people detected count
- [ ] Add vehicles detected count
- [ ] Build live camera grid
- [ ] Add recent events
- [ ] Add alert indicator
- [ ] Make dashboard responsive

### Dashboard KPIs

```text
12 Cameras
48 People
17 Vehicles
03 Active Threats
```

### Goal

The dashboard must look like a professional **security command center**, not a normal college website.

---

## Block 3 — Live Surveillance UI
**Target: ~1.5 hours**

- [ ] Build camera grid
- [ ] Show camera status
- [ ] Add video player
- [ ] Show timestamp
- [ ] Show camera ID
- [ ] Add detection overlay UI
- [ ] Show confidence score
- [ ] Add full-screen camera view
- [ ] Add camera details panel
- [ ] Use MP4 demo videos initially

> Do not wait for RTSP integration before building the UI.

---

## Block 4 — Backend Foundation
**Target: ~1.5 hours**

Create FastAPI endpoints:

- [ ] `GET /api/cameras`
- [ ] `POST /api/cameras`
- [ ] `GET /api/events`
- [ ] `GET /api/alerts`
- [ ] `GET /api/detections`
- [ ] `GET /api/analytics`
- [ ] `GET /api/zones`
- [ ] `POST /api/zones`

Create database models:

- [ ] Camera
- [ ] Detection
- [ ] Event
- [ ] Alert
- [ ] Zone

---

## Block 5 — Camera + Event Management
**Target: ~1 hour**

- [ ] Add camera
- [ ] Remove camera
- [ ] Camera online/offline status
- [ ] Camera location
- [ ] Create events
- [ ] Event history
- [ ] Event filtering
- [ ] Severity filtering

---

## Block 6 — Alert System
**Target: ~1 hour**

Create severity levels:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

Implement:

- [ ] Alert list
- [ ] Alert details
- [ ] Acknowledge alert
- [ ] Resolve alert
- [ ] Alert timestamp
- [ ] Camera reference
- [ ] Threat score
- [ ] Event snapshot/reference

---

## Day 1 Completion Target

By the end of Day 1:

```text
React Dashboard
      ↓
FastAPI
      ↓
Database
      ↓
Camera / Event / Alert APIs
```

The application should already look like a working surveillance product.

---

# DAY 2 — AI + Intelligence + Integration

## Block 7 — YOLO Detection
**Target: ~2 hours**

- [ ] Load pretrained YOLO model
- [ ] Read video
- [ ] Process video frames
- [ ] Detect people
- [ ] Detect vehicles
- [ ] Draw bounding boxes
- [ ] Show confidence score
- [ ] Generate detection metadata
- [ ] Save detection events

### Example

```text
Person P17
Confidence: 96.4%
Camera: BOP-03
```

> Do not waste time training a new model. Use a suitable pretrained model.

---

## Block 8 — Object Tracking
**Target: ~1 hour**

Use ByteTrack or an equivalent tracker.

- [ ] Track people
- [ ] Track vehicles
- [ ] Generate track IDs
- [ ] Track movement
- [ ] Track duration
- [ ] Track coordinates
- [ ] Store track history

### Example

```text
Frame 1 → P17
Frame 2 → P17
Frame 3 → P17
Frame 4 → P17
```

---

## Block 9 — Virtual Fence
**Target: ~1 hour**

- [ ] Create polygon zone
- [ ] Store zone
- [ ] Display zone on video
- [ ] Detect object entering zone
- [ ] Generate intrusion event
- [ ] Generate alert
- [ ] Show zone status

### Demo Flow

```text
Person P17
     ↓
Restricted Zone
     ↓
INTRUSION
     ↓
Alert
```

> This is a P0 feature and should be fully functional.

---

## Block 10 — Threat Engine
**Target: ~1 hour**

Implement an explainable prototype scoring system.

Example:

```text
Person detected          +10
Restricted zone          +30
Night movement           +20
Loitering                +15
Direction anomaly        +15
────────────────────────────
Threat Score              90
```

Severity:

```text
0–30       LOW
31–60      MEDIUM
61–80      HIGH
81–100     CRITICAL
```

Implement:

- [ ] Threat score
- [ ] Threat factors
- [ ] Severity classification
- [ ] Recommended action

> These scores are a prototype policy, not an official government formula.

---

## Block 11 — Real-Time WebSocket
**Target: ~1 hour**

Connect:

```text
AI Engine
    ↓
FastAPI
    ↓
WebSocket
    ↓
React Dashboard
```

Implement:

- [ ] Detection events
- [ ] Alert events
- [ ] Threat events
- [ ] Camera status events
- [ ] Real-time dashboard updates
- [ ] No-refresh alert updates

Expected result:

```text
🚨 CRITICAL ALERT
```

appears immediately when an event occurs.

---

## Block 12 — ANPR
**Target: ~45 minutes**

If time allows:

- [ ] Detect vehicle
- [ ] Detect/crop number plate
- [ ] OCR plate
- [ ] Extract plate number
- [ ] Store vehicle record
- [ ] Show known/unknown status

Example:

```text
DL01AB1234
SUV
97.2%
```

> If ANPR takes too long, do not sacrifice P0 features. Use a prepared ANPR demonstration.

---

## Block 13 — Analytics + Map
**Target: ~45 minutes**

### Analytics

- [ ] Detection chart
- [ ] Alert chart
- [ ] Hourly activity
- [ ] People vs vehicles
- [ ] Threat distribution
- [ ] Daily event summary

### Map

- [ ] Show camera locations
- [ ] Show camera status
- [ ] Show alert location
- [ ] Click camera → camera details

---

## Block 14 — Demo Mode
**Target: ~30 minutes**

Create:

```text
SYSTEM MODE

● DEMO MODE
○ LIVE MODE
```

Demo controls:

- [ ] Person Detection
- [ ] Vehicle Detection
- [ ] Virtual Fence Breach
- [ ] Night Intrusion
- [ ] ANPR Detection
- [ ] Critical Alert

Each demo action should trigger the corresponding UI/backend workflow.

> Demo Mode is critical because it makes the presentation reliable even if a live camera or network connection fails.

---

# FINAL 4 HOURS — TESTING + DEPLOYMENT

**Do not use these 4 hours to add new features.**

---

## Testing — Hour 1: Frontend

- [ ] Dashboard loads
- [ ] No console errors
- [ ] Desktop layout works
- [ ] Mobile layout works
- [ ] Navigation works
- [ ] Camera pages work
- [ ] Alerts work
- [ ] Events work
- [ ] Analytics work
- [ ] Map works
- [ ] Demo Mode works

---

## Testing — Hour 2: Backend + AI

Test the complete pipeline:

```text
Video
 ↓
YOLO
 ↓
Tracking
 ↓
Virtual Fence
 ↓
Threat Engine
 ↓
Alert
 ↓
WebSocket
 ↓
Dashboard
```

Checklist:

- [ ] API health check
- [ ] Database connection
- [ ] Camera API
- [ ] Event API
- [ ] Alert API
- [ ] WebSocket
- [ ] YOLO inference
- [ ] Object tracking
- [ ] Virtual fence
- [ ] Threat scoring
- [ ] Alert generation
- [ ] Event persistence

---

## Deployment — Hour 3

### Frontend

Deploy using one of:

- [ ] Netlify
- [ ] Vercel

### Backend

Deploy using one of:

- [ ] Render
- [ ] Railway
- [ ] VPS

### Database

Use:

- [ ] Supabase PostgreSQL
- [ ] Neon PostgreSQL
- [ ] Self-hosted PostgreSQL

### AI

Preferred for presentation:

- [ ] Local machine/GPU
- [ ] Dedicated AI server
- [ ] Separate AI service if deployment resources allow

---

## Deployment Verification — Hour 4

- [ ] Production frontend opens
- [ ] Production backend responds
- [ ] CORS configured
- [ ] Environment variables configured
- [ ] Database connected
- [ ] WebSocket works
- [ ] Demo videos accessible
- [ ] AI model loads
- [ ] API URLs are production URLs
- [ ] No broken links
- [ ] Test from another device
- [ ] Test on presentation laptop
- [ ] Backup local version
- [ ] Backup demo videos
- [ ] Backup source code
- [ ] Keep offline demo ready

---

# P0 — MUST WORK

If time becomes limited, these features have priority:

- [ ] Command Dashboard
- [ ] Video Feed
- [ ] Person Detection
- [ ] Vehicle Detection
- [ ] Object Tracking
- [ ] Virtual Fence
- [ ] Threat Score
- [ ] Alert System
- [ ] Event History
- [ ] Demo Mode

---

# P1 — SHOULD WORK

- [ ] WebSocket
- [ ] ANPR
- [ ] Analytics
- [ ] Camera Management
- [ ] Map
- [ ] PostgreSQL

---

# P2 — NICE TO HAVE

- [ ] Face Recognition
- [ ] Multi-camera Re-identification
- [ ] Advanced Behaviour Detection
- [ ] SMS/Email Alerts
- [ ] CIBMS Integration
- [ ] Advanced RBAC
- [ ] Advanced reporting

> **Never sacrifice P0 for P2.**

---

# FINAL DEMO SCENARIO

The team must be able to demonstrate this complete workflow:

```text
                 BOP-03 CAMERA
                       │
                       ▼
                   VIDEO FEED
                       │
                       ▼
                  YOLO DETECTS
                       │
                       ▼
                   PERSON P17
                       │
                       ▼
                  BYTE TRACK
                       │
                       ▼
                ENTERS ZONE A
                       │
                       ▼
                NIGHT TIME RULE
                       │
                       ▼
                 THREAT ENGINE
                       │
                       ▼
                  SCORE: 87
                       │
                       ▼
                🚨 HIGH ALERT
                       │
                       ▼
                  WEBSOCKET
                       │
                       ▼
                COMMAND CENTER
                       │
                       ▼
             OPERATOR ACKNOWLEDGES
                       │
                       ▼
                  EVENT LOGGED
```

---

# Final Product Architecture

```text
                    EXISTING CCTV
                         │
                   RTSP / ONVIF
                         │
                         ▼
                ┌─────────────────┐
                │ Video Ingestion │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │   AI ENGINE     │
                │                 │
                │ YOLO            │
                │ ByteTrack       │
                │ ANPR            │
                │ Face Detection  │
                └────────┬────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ Border Intelligence │
              │                     │
              │ Virtual Fence       │
              │ Night Rules         │
              │ Behaviour Rules     │
              │ Event Correlation   │
              └──────────┬──────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Threat Engine   │
                └────────┬────────┘
                         │
                         ▼
                ┌─────────────────┐
                │ Alert / Event   │
                │ Engine          │
                └────────┬────────┘
                         │
                         ▼
                 FastAPI Backend
                         │
                  REST + WebSocket
                         │
                         ▼
                React Command Center
```

---

# Presentation-Day Backup Checklist

- [ ] Local frontend build
- [ ] Local backend
- [ ] Local AI model
- [ ] Demo videos
- [ ] Database backup/seed data
- [ ] `.env` backup
- [ ] Production URLs
- [ ] Git repository pushed
- [ ] Laptop charger
- [ ] Internet hotspot backup
- [ ] 1 complete offline demo
- [ ] 1 complete online demo
- [ ] Presentation PPT
- [ ] Demo script
- [ ] Judge Q&A preparation

---

# Definition of Done

IBVAP is ready for the SIH presentation when:

- [ ] A camera/video can be opened.
- [ ] Person/vehicle detection works.
- [ ] Objects can be tracked.
- [ ] A restricted zone can be defined.
- [ ] Zone intrusion generates an event.
- [ ] Threat score is calculated.
- [ ] Alert appears in real time.
- [ ] Event is stored.
- [ ] Dashboard displays the event.
- [ ] Operator can acknowledge/resolve the alert.
- [ ] Analytics display meaningful data.
- [ ] Demo Mode can reproduce the complete scenario.
- [ ] Production deployment works.
- [ ] Offline backup works.

---

## Core Message for the Team

> **Do not try to build a production-grade border-security system in two days. Build one complete, reliable, believable end-to-end intelligence workflow and surround it with a professional command-center interface.**

**Detection → Tracking → Intelligence → Threat → Alert → Response**

That is the workflow the judges should remember.
