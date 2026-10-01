import { Mail, BookOpen, User } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";

function TeacherProfile() {
    const teacher = {
        name: "Test Teacher",
        email: "testteacher@gyansetu.com",
        subjects: ["Java", "DBMS"]
    };

    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Topbar />

                <section className="page-content">
                    <div className="page-header">
                        <div>
                            <p className="welcome-label">Account</p>
                            <h1>Profile</h1>
                            <p>
                                View your teacher information and academic details.
                            </p>
                        </div>
                    </div>

                    <div className="profile-layout">
                        <section className="content-card profile-main-card">
                            <div className="profile-heading">
                                <div className="profile-avatar">
                                    {teacher.name.charAt(0)}
                                </div>

                                <div>
                                    <h2>{teacher.name}</h2>
                                    <p>Teacher</p>
                                </div>
                            </div>

                            <div className="profile-divider" />

                            <div className="profile-details">
                                <div className="profile-detail">
                                    <Mail size={16} />

                                    <div>
                                        <span>Email</span>
                                        <strong>{teacher.email}</strong>
                                    </div>
                                </div>

                                <div className="profile-detail">
                                    <BookOpen size={16} />

                                    <div>
                                        <span>Subjects</span>
                                        <strong>
                                            {teacher.subjects.join(", ")}
                                        </strong>
                                    </div>
                                </div>

                                <div className="profile-detail">
                                    <User size={16} />

                                    <div>
                                        <span>Role</span>
                                        <strong>Teacher</strong>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="content-card profile-academic-card">
                            <div className="card-header">
                                <div>
                                    <h2>Teaching Information</h2>
                                    <p>Current teaching details</p>
                                </div>
                            </div>

                            <div className="academic-item">
                                <span>Subjects</span>
                                <strong>
                                    {teacher.subjects.join(" · ")}
                                </strong>
                            </div>

                            <div className="academic-item">
                                <span>Classes</span>
                                <strong>CSE-A</strong>
                            </div>

                            <div className="academic-item">
                                <span>Account status</span>
                                <strong className="active-status">
                                    Active
                                </strong>
                            </div>
                        </section>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default TeacherProfile;