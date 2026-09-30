import {
    LayoutDashboard,
    ClipboardList,
    FileCheck2,
    CalendarCheck,
    User,
    LogOut,
    GraduationCap
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        navigate("/");
    };
    const links = [
        {
            name: "Dashboard",
            path: "/student/dashboard",
            icon: LayoutDashboard
        },
        {
            name: "Assignments",
            path: "/student/assignments",
            icon: ClipboardList
        },
        {
            name: "Submissions",
            path: "/student/submissions",
            icon: FileCheck2
        },
        {
            name: "Attendance",
            path: "/student/attendance",
            icon: CalendarCheck
        }
    ];

    return (
        <aside className="sidebar">
            <div className="sidebar-logo">
                <div className="logo-icon">
                    <GraduationCap size={22} />
                </div>

                <span>GyanSetu</span>
            </div>

            <nav className="sidebar-nav">
                {links.map((link) => {
                    const Icon = link.icon;

                    return (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `nav-link ${isActive ? "active" : ""}`
                            }
                        >
                            <Icon size={19} />
                            <span>{link.name}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <button className="logout-button" onClick={handleLogout}>
                <LogOut size={19} />
                <span>Logout</span>
            </button>
        </aside>
    );
}

export default Sidebar;