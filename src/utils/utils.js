import { Award, BarChart3, Calendar, ClipboardList, Hourglass, Layers, LayoutDashboard, Mail, Megaphone, MessageSquare, SettingsIcon, Table2, User, Users } from "lucide-react";

export const COLORS = {
    primary: "#1D4ED8",
    primaryDark: "#1E3A8A",
    primaryLight: "#3B82F6",
    primaryTint: "#EFF6FF",
    navy: "#0B1C3D",
    navySoft: "#132A54",
    ink: "#0F172A",
    muted: "#64748B",
    border: "#E2E8F0",
    bg: "#F5F7FB",
    success: "#16A34A",
    warning: "#D97706",
    danger: "#DC2626",
    chart: ["#1D4ED8", "#38BDF8", "#F59E0B", "#16A34A", "#8B5CF6"]
};

export const INSTRUCTOR_NAV = [
    { Key: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { Key: "courses", label: "My Courses", icon: BookOpen },
    { Key: "content", label: "Course Content", icon: Layers },
    { Key: "assessments", label: "Assessment", icon: ClipboardList },
    { Key: "students", label: "Students", icon: Users },
    { Key: "gradebook", label: "Gradebook", icon: Table2 },
    { Key: "pending", label: "Pending Grading", icon: Hourglass, badge: 12 },
    { Key: "announcements", label: "Announcements", icon: Megaphone },
    { Key: "discussions", label: "Discussions", icon: MessageSquare },
    { Key: "messages", label: "Messages", icon: Mail, badge: 4 },
    { Key: "calendar", label: "Calendar", icon: Calendar },
    { Key: "analytics", label: "Analytics", icon: BarChart3 },
    { Key: "ceritificates", label: "Cerificates", icon: Award },
    { Key: "settings", label: "Settings", icon: SettingsIcon },
    { Key: "profile", label: "Profile", icon: User }
]

export const INSTRUCTOR_PAGE_TITLES = Object.fromEntries(INSTRUCTOR_NAV.map(n =>
    [n.Key, n.label]));

export const enrollmentTrend = [
    { m: "Jan", students: 210 }, { m: "Feb", students: 248 }, { m: "Mar", students: 275 },
    { m: "Apr", students: 301 }, { m: "May", students: 322 }, { m: "Jun", students: 366 }
];

export const completionData = [
    { course: "React Basics", rate: 82 },
    { course: "Adv. JS", rate: 67 },
    { course: "Node APIs", rate: 74 },
    { course: "Databases", rate: 58 }
];

export const submissionDate = [
    { w: "W1", rate: 92 },
    { w: "W2", rate: 88 },
    { w: "W3", rate: 95 },
    { w: "W4", rate: 79 },
    { w: "W5", rate: 90 }
];

export const engagementPie = [
    { name: "Video Views", value: 420 },
    { name: "Disucssion Posts", value: 180 },
    { name: "Assignment Submits", value: 260 },
    { name: "Quiz Attempts", value: 210 }
];

export const courses = [
    { id: 1, name: "React Testing Fundamentals", term: "Term 2, 2026", students: 84, completion: 82, status: "Published" },
    { id: 2, name: "Advanced JavaScript Patters", term: "Term 2, 2026", students: 63, completion: 67, status: "Published" },
    { id: 3, name: "ASP.NET Core Web APIs", term: "Term 1, 2026", students: 51, completion: 74, status: "Published" },
    { id: 4, name: "Database Design & ORMs", term: "Term 2, 2026", students: 47, completion: 58, status: "Draft" }
];

export const students = [
    { id: 1, name: "John Carter", email: "john.carter@mail.com", progress: 88, avg: 91, attendance: 96, last: "2h ago" },
    { id: 2, name: "Mary Chen", email: "mary.chen@mail.com", progress: 74, avg: 85, attendance: 89, last: "1d ago" },
    { id: 3, name: "Amir Hassan", email: "amir.hassan@mail.com", progress: 61, avg: 72, attendance: 78, last: "3d ago" },
    { id: 4, name: "Priya Nair", email: "priya.nair@mail.com", progress: 95, avg: 94, attendance: 99, last: "5h ago" },
    { id: 5, name: "Tom Baker", email: "tom.baker@mail.com", progress: 42, avg: 58, attendance: 65, last: "6d ago" },
];

export const gradebookCols = ["Assignment 1", "Assignment 2", "Quiz 1", "Quiz 2", "Exam"];
export const gradebookData = students.map((s, i) => ({
    name: s.name,
    scores: [88, 74, 92, 68, 85].map(v => Math.max(50, v - i * 3 + (i % 2 === 0 ? 4 : -2))),
    final: [86, 79, 71, 88, 63][i]
}));

export const pendingGrading = [
    { id: 1, title: "Assignment 3: Component Testing", student: "John Carter", submitted: "Jul 3", waiting: 3 },
    { id: 2, title: "Quiz 2: Mocking with MSW", student: "Mary Chen", submitted: "Jul 4", waiting: 2 },
    { id: 3, title: "Assignment 3: Component Testing", student: "Amir Hassan", submitted: "Jul 2", waiting: 4 },
    { id: 4, title: "Final Project Draft", student: "Priya Nair", submitted: "Jul 5", waiting: 1 }
];

export const announcements = [
    { id: 1, title: "Assignment 3 deadline extended", status: "Published", date: "Jul 4" },
    { id: 2, title: "Live review session this Friday", status: "Scheduled", date: "Jul 10" },
    { id: 3, title: "Mid-term feedback survey", status: "Draft", date: "-" },
];

export const discussions = [
    { id: 1, title: "How does MSW intercept fetch calls?", replies: 12, pinned: true, locked: false }, 
    { id: 2, title: "Testing Library queries — best practices", replies: 8, pinned: false, locked: false }, 
    { id: 3, title: "Week 4 project showcase", replies: 21, pinned: false, locked: true },
]; 

export const calendarEvents = [
    { id: 1, title: "Quiz 2 closes", date: "Jul 7", type: "Quiz" }, 
    { id: 2, title: "Assignment 3 due", date: "Jul 9", type: "Assignment" }, 
    { id: 3, title: "Live Lecture: Context API", date: "Jul 10", type: "Lecture" }, 
    { id: 4, title: "Office Hours", date: "Jul 11", type: "Office Hours" },
];