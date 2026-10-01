import {
    LayoutDashboard,
    ClipboardList,
    FileText,
    CalendarCheck,
    Users,
    LogOut,
    GraduationCap
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    const role = localStorage.getItem("role") || "student";

    const studentLinks = [
        {
            label: "Dashboard",
            path: "/student/dashboard",
            icon: LayoutDashboard
        },
        {
            label: "Assignments",
            path: "/student/assignments",
            icon: ClipboardList
        },
        {
            label: "Submissions",
            path: "/student/submissions",
            icon: FileText
        },
        {
            label: "Attendance",
            path: "/student/attendance",
            icon: CalendarCheck
        }
    ];

    const teacherLinks = [
        {
            label: "Dashboard",
            path: "/teacher/dashboard",
            icon: LayoutDashboard
        },
        {
            label: "Assignments",
            path: "/teacher/assignments",
            icon: ClipboardList
        },
        {
            label: "Submissions",
            path: "/teacher/submissions",
            icon: FileText
        },
        {
            label: "Attendance",
            path: "/teacher/attendance",
            icon: CalendarCheck
        },
        {
            label: "Students",
            path: "/teacher/students",
            icon: Users
        }
    ];

    const links = role === "teacher" ? teacherLinks : studentLinks;

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div className="logo-icon">
                    <GraduationCap size={19} />
                </div>

                <div>
                    <strong>GyanSetu</strong>
                    <span>{role === "teacher" ? "Teacher Portal" : "Student Portal"}</span>
                </div>
            </div>

            <nav className="sidebar-nav">
                {links.map((link) => {
                    const Icon = link.icon;

                    return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={
                                location.pathname === link.path
                                    ? "nav-link active"
                                    : "nav-link"
                            }
                        >
                            <Icon size={16} />
                            <span>{link.label}</span>
                        </Link>
                    );
                })}
            </nav>

            <button
                className="logout-button"
                onClick={handleLogout}
            >
                <LogOut size={16} />
                <span>Logout</span>
            </button>
        </aside>
    );
}

export default Sidebar;