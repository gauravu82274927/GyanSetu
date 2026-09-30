import { Bell } from "lucide-react";

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

                <div className="avatar">
                    TS
                </div>
            </div>
        </header>
    );
}

export default Topbar;