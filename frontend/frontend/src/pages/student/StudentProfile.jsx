import { Mail, GraduationCap, User } from "lucide-react";
import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import { student } from "../../data/mockData";

function StudentProfile() {
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
                                View your student information and academic details.
                            </p>
                        </div>
                    </div>

                    <div className="profile-layout">
                        <section className="content-card profile-main-card">
                            <div className="profile-heading">
                                <div className="profile-avatar">
                                    {student.name.charAt(0)}
                                </div>

                                <div>
                                    <h2>{student.name}</h2>
                                    <p>Student</p>
                                </div>
                            </div>

                            <div className="profile-divider" />

                            <div className="profile-details">
                                <div className="profile-detail">
                                    <Mail size={16} />
                                    <div>
                                        <span>Email</span>
                                        <strong>{student.email}</strong>
                                    </div>
                                </div>

                                <div className="profile-detail">
                                    <GraduationCap size={16} />
                                    <div>
                                        <span>Class</span>
                                        <strong>{student.className}</strong>
                                    </div>
                                </div>

                                <div className="profile-detail">
                                    <User size={16} />
                                    <div>
                                        <span>Role</span>
                                        <strong>Student</strong>
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="content-card profile-academic-card">
                            <div className="card-header">
                                <div>
                                    <h2>Academic Information</h2>
                                    <p>Current academic details</p>
                                </div>
                            </div>

                            <div className="academic-item">
                                <span>Program</span>
                                <strong>Computer Science Engineering</strong>
                            </div>

                            <div className="academic-item">
                                <span>Class</span>
                                <strong>{student.className}</strong>
                            </div>

                            <div className="academic-item">
                                <span>Student status</span>
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

export default StudentProfile;