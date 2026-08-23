const DEMO_DATA = {
    user: {
        id: "USR-1001",
        name: "Shivam Maurya",
        email: "shivam@example.com",
        role: "university",
        institution: "ABES Engineering College",
        district: "Ghaziabad"
    },

    stats: {
        totalChallenges: 12482,
        activeProjects: 1842,
        universities: 86,
        industryPartners: 214,
        resolvedChallenges: 4826,
        citizens: 28482,
        students: 6340,
        mentors: 892
    },

    challenges: [
        {
            id: "JH-10482",
            title: "Smart Irrigation for Rural Farmers",
            description: "Develop an affordable IoT-based irrigation monitoring system that helps farmers optimize water usage and improve crop productivity.",
            category: "Agriculture",
            district: "Ranchi",
            location: "Namkum, Ranchi",
            submittedBy: "Village Development Committee",
            priority: "High",
            status: "In Progress",
            aiScore: 94,
            date: "2026-08-18",
            views: 284,
            proposals: 7
        },
        {
            id: "JH-10476",
            title: "Digital Learning Access for Rural Schools",
            description: "Create a low-cost digital learning platform for schools with limited internet connectivity and educational resources.",
            category: "Education",
            district: "Dumka",
            location: "Jama, Dumka",
            submittedBy: "District Education Department",
            priority: "High",
            status: "Under Review",
            aiScore: 91,
            date: "2026-08-16",
            views: 196,
            proposals: 5
        },
        {
            id: "JH-10471",
            title: "Village Water Quality Monitoring",
            description: "Develop an easy-to-use water quality monitoring system that can detect contamination in rural drinking water sources.",
            category: "Water",
            district: "Deoghar",
            location: "Madhupur, Deoghar",
            submittedBy: "Gram Panchayat",
            priority: "Critical",
            status: "Validated",
            aiScore: 96,
            date: "2026-08-14",
            views: 341,
            proposals: 9
        },
        {
            id: "JH-10463",
            title: "Telemedicine Support for Remote Villages",
            description: "Build a telemedicine solution connecting rural patients with doctors and healthcare specialists.",
            category: "Healthcare",
            district: "Gumla",
            location: "Chainpur, Gumla",
            submittedBy: "Community Health Centre",
            priority: "High",
            status: "Assigned",
            aiScore: 89,
            date: "2026-08-11",
            views: 412,
            proposals: 6
        },
        {
            id: "JH-10458",
            title: "Waste Management Optimization",
            description: "Create a technology-assisted waste collection and segregation system for growing urban areas.",
            category: "Environment",
            district: "Dhanbad",
            location: "Jharia, Dhanbad",
            submittedBy: "Urban Local Body",
            priority: "Medium",
            status: "Under Review",
            aiScore: 84,
            date: "2026-08-09",
            views: 173,
            proposals: 4
        },
        {
            id: "JH-10449",
            title: "Solar Energy for Community Facilities",
            description: "Design a sustainable solar energy solution for schools, health centres and community buildings.",
            category: "Energy",
            district: "Hazaribagh",
            location: "Barkagaon, Hazaribagh",
            submittedBy: "Block Development Office",
            priority: "Medium",
            status: "Validated",
            aiScore: 87,
            date: "2026-08-05",
            views: 229,
            proposals: 8
        },
        {
            id: "JH-10432",
            title: "Accessible Public Transport System",
            description: "Improve public transportation accessibility for elderly people and persons with disabilities.",
            category: "Accessibility",
            district: "Bokaro",
            location: "Chas, Bokaro",
            submittedBy: "Citizen Group",
            priority: "High",
            status: "Assigned",
            aiScore: 82,
            date: "2026-07-29",
            views: 147,
            proposals: 3
        },
        {
            id: "JH-10421",
            title: "Digital Market Access for Rural Artisans",
            description: "Build a digital marketplace that enables rural artisans to sell products directly to customers.",
            category: "Rural Livelihood",
            district: "Khunti",
            location: "Murhu, Khunti",
            submittedBy: "Artisan Cooperative",
            priority: "Medium",
            status: "In Progress",
            aiScore: 90,
            date: "2026-07-24",
            views: 310,
            proposals: 6
        }
    ],

    projects: [
        {
            id: "PRJ-2026-001",
            title: "AI Crop Advisory Platform",
            description: "AI-powered advisory platform helping farmers with crop selection, irrigation and disease detection.",
            category: "Agriculture",
            district: "Ranchi",
            university: "BIT Mesra",
            industry: "AgriTech Solutions",
            status: "Active",
            progress: 68,
            members: 8,
            milestones: 12,
            completedMilestones: 8
        },
        {
            id: "PRJ-2026-002",
            title: "Rural Healthcare Assistant",
            description: "Digital healthcare assistant connecting rural communities with medical professionals.",
            category: "Healthcare",
            district: "Gumla",
            university: "RIMS Innovation Centre",
            industry: "HealthTech Labs",
            status: "Active",
            progress: 52,
            members: 6,
            milestones: 10,
            completedMilestones: 5
        },
        {
            id: "PRJ-2026-003",
            title: "Smart Water Monitoring",
            description: "Low-cost IoT solution for monitoring drinking water quality in rural areas.",
            category: "Water",
            district: "Deoghar",
            university: "NIT Jamshedpur",
            industry: "IoT Innovations",
            status: "Pilot",
            progress: 84,
            members: 5,
            milestones: 8,
            completedMilestones: 7
        },
        {
            id: "PRJ-2026-004",
            title: "Digital Learning Network",
            description: "Offline-first educational platform for schools with poor internet connectivity.",
            category: "Education",
            district: "Dumka",
            university: "Central University of Jharkhand",
            industry: "EdTech Foundation",
            status: "Prototype",
            progress: 43,
            members: 9,
            milestones: 14,
            completedMilestones: 6
        },
        {
            id: "PRJ-2026-005",
            title: "Smart Waste Management",
            description: "Technology-enabled waste collection and segregation platform for urban communities.",
            category: "Environment",
            district: "Dhanbad",
            university: "IIT ISM Dhanbad",
            industry: "GreenTech India",
            status: "Research",
            progress: 31,
            members: 7,
            milestones: 10,
            completedMilestones: 3
        }
    ],

    universities: [
        {
            id: "UNI-001",
            name: "BIT Mesra",
            district: "Ranchi",
            expertise: ["AI", "Agriculture", "IoT"],
            challenges: 248,
            projects: 62,
            students: 840
        },
        {
            id: "UNI-002",
            name: "IIT ISM Dhanbad",
            district: "Dhanbad",
            expertise: ["Mining", "Environment", "AI"],
            challenges: 196,
            projects: 54,
            students: 620
        },
        {
            id: "UNI-003",
            name: "NIT Jamshedpur",
            district: "Jamshedpur",
            expertise: ["IoT", "Engineering", "Energy"],
            challenges: 214,
            projects: 49,
            students: 710
        },
        {
            id: "UNI-004",
            name: "Central University of Jharkhand",
            district: "Ranchi",
            expertise: ["Education", "Social Science", "Technology"],
            challenges: 178,
            projects: 41,
            students: 520
        }
    ],

    industryPartners: [
        {
            id: "IND-001",
            name: "AgriTech Solutions",
            sector: "Agriculture",
            type: "Startup",
            projects: 12,
            status: "Active"
        },
        {
            id: "IND-002",
            name: "HealthTech Labs",
            sector: "Healthcare",
            type: "Startup",
            projects: 8,
            status: "Active"
        },
        {
            id: "IND-003",
            name: "GreenTech India",
            sector: "Environment",
            type: "MSME",
            projects: 15,
            status: "Active"
        },
        {
            id: "IND-004",
            name: "IoT Innovations",
            sector: "Technology",
            type: "Startup",
            projects: 10,
            status: "Active"
        },
        {
            id: "IND-005",
            name: "Rural Development Foundation",
            sector: "Social Impact",
            type: "CSR",
            projects: 18,
            status: "Active"
        }
    ],

    teams: [
        {
            id: "TEAM-001",
            name: "Smart Agriculture Team",
            project: "AI Crop Advisory Platform",
            facultyMentor: "Dr. Anil Kumar",
            members: 8,
            progress: 68,
            status: "Active"
        },
        {
            id: "TEAM-002",
            name: "Healthcare Innovation Team",
            project: "Rural Healthcare Assistant",
            facultyMentor: "Dr. Priya Sharma",
            members: 6,
            progress: 52,
            status: "Active"
        },
        {
            id: "TEAM-003",
            name: "Water Technology Team",
            project: "Smart Water Monitoring",
            facultyMentor: "Dr. Rajesh Singh",
            members: 5,
            progress: 84,
            status: "Active"
        },
        {
            id: "TEAM-004",
            name: "Digital Education Team",
            project: "Digital Learning Network",
            facultyMentor: "Dr. Neha Verma",
            members: 9,
            progress: 43,
            status: "Active"
        }
    ],

    districts: [
        {
            name: "Ranchi",
            challenges: 2480,
            projects: 318,
            resolved: 942,
            universities: 12
        },
        {
            name: "Dhanbad",
            challenges: 2140,
            projects: 276,
            resolved: 824,
            universities: 8
        },
        {
            name: "Deoghar",
            challenges: 1680,
            projects: 192,
            resolved: 638,
            universities: 6
        },
        {
            name: "Bokaro",
            challenges: 1780,
            projects: 214,
            resolved: 714,
            universities: 7
        },
        {
            name: "Dumka",
            challenges: 1420,
            projects: 168,
            resolved: 526,
            universities: 5
        },
        {
            name: "Hazaribagh",
            challenges: 1530,
            projects: 185,
            resolved: 591,
            universities: 6
        },
        {
            name: "Gumla",
            challenges: 980,
            projects: 116,
            resolved: 384,
            universities: 4
        },
        {
            name: "Khunti",
            challenges: 760,
            projects: 92,
            resolved: 301,
            universities: 3
        }
    ],

    analytics: {
        domains: [
            { label: "Education", value: 2480, percentage: 20 },
            { label: "Healthcare", value: 2140, percentage: 17 },
            { label: "Agriculture", value: 2860, percentage: 23 },
            { label: "Water", value: 1560, percentage: 12 },
            { label: "Environment", value: 1280, percentage: 10 },
            { label: "Energy", value: 940, percentage: 8 },
            { label: "Infrastructure", value: 1222, percentage: 10 }
        ],

        projects: [
            { label: "Review", value: 38 },
            { label: "Research", value: 62 },
            { label: "Prototype", value: 48 },
            { label: "Pilot", value: 35 },
            { label: "Deployment", value: 22 }
        ],

        impact: [
            { label: "Ranchi", value: 8400 },
            { label: "Dhanbad", value: 9100 },
            { label: "Bokaro", value: 6800 },
            { label: "Dumka", value: 6200 },
            { label: "Deoghar", value: 5700 },
            { label: "Gumla", value: 4300 }
        ],

        monthlyChallenges: [
            { month: "Mar", value: 620 },
            { month: "Apr", value: 840 },
            { month: "May", value: 980 },
            { month: "Jun", value: 1120 },
            { month: "Jul", value: 1340 },
            { month: "Aug", value: 1580 }
        ]
    },

    notifications: [
        {
            id: "NOT-001",
            title: "Challenge validated",
            message: "JH-10471 has been validated by the review team.",
            type: "success",
            time: "10 minutes ago",
            read: false
        },
        {
            id: "NOT-002",
            title: "New project proposal",
            message: "A university submitted a proposal for JH-10482.",
            type: "info",
            time: "35 minutes ago",
            read: false
        },
        {
            id: "NOT-003",
            title: "Milestone completed",
            message: "Smart Water Monitoring completed milestone 7.",
            type: "success",
            time: "2 hours ago",
            read: true
        },
        {
            id: "NOT-004",
            title: "Industry collaboration request",
            message: "AgriTech Solutions requested to join a project.",
            type: "info",
            time: "5 hours ago",
            read: true
        }
    ],

    categories: [
        "Education",
        "Agriculture",
        "Healthcare",
        "Water",
        "Environment",
        "Energy",
        "Infrastructure",
        "Accessibility",
        "Public Administration",
        "Rural Livelihood"
    ],

    statuses: [
        "Submitted",
        "Under Review",
        "Validated",
        "Assigned",
        "In Progress",
        "Pilot",
        "Resolved",
        "Rejected"
    ],

    priorities: [
        "Low",
        "Medium",
        "High",
        "Critical"
    ]
};

function getDemoChallenges() { return DEMO_DATA.challenges; }
function getDemoProjects() { return DEMO_DATA.projects; }
function getDemoTeams() { return DEMO_DATA.teams; }
function getDemoDistricts() { return DEMO_DATA.districts; }
function getDemoAnalytics() { return DEMO_DATA.analytics; }
function getDemoNotifications() { return DEMO_DATA.notifications; }
function getDemoUser() { return DEMO_DATA.user; }
function getDemoStats() { return DEMO_DATA.stats; }

window.DEMO_DATA = DEMO_DATA;
window.getDemoChallenges = getDemoChallenges;
window.getDemoProjects = getDemoProjects;
window.getDemoTeams = getDemoTeams;
window.getDemoDistricts = getDemoDistricts;
window.getDemoAnalytics = getDemoAnalytics;
window.getDemoNotifications = getDemoNotifications;
window.getDemoUser = getDemoUser;
window.getDemoStats = getDemoStats;
