import { Bell } from "lucide-react";
import { Link } from "react-router-dom";

const role = localStorage.getItem("role") || "student";

const profilePath =
    role === "teacher"
        ? "/teacher/profile"
        : "/student/profile";

function Topbar() {
    return (
        <header className="topbar">
            <div>
                <p className="topbar-label">Student Portal</p>
                <h2>Academic Overview</h2>
            </div>

            <div className="topbar-right">
                <button className="notification-button">
                    <Bell size={20} />
                    <span></span>
                </button>

                <Link to={profilePath} className="avatar-link">
                    <div className="avatar">G</div>
                </Link>
            </div>
        </header>
    );
}

export default Topbar;