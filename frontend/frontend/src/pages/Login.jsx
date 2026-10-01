import { GraduationCap, Mail, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";


function Login() {
    const navigate = useNavigate();

    const [role, setRole] = useState("student");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();

        if (role === "student") {
            localStorage.setItem("token", "mock-student-token");
            localStorage.setItem("role", "student");

            navigate("/student/dashboard");
        } else {
            localStorage.setItem("token", "mock-teacher-token");
            localStorage.setItem("role", "teacher");

            navigate("/teacher/dashboard");
        }
    };

    return (
        <div className="login-page">

            <div className="login-brand">
                <div className="login-logo">
                    <GraduationCap size={26} />
                </div>

                <h1>GyanSetu</h1>
                <p>Learning made accessible.</p>
            </div>

            <div className="login-card">

                <div className="login-header">
                    <h2>Welcome back</h2>
                    <p>
                        Sign in to continue to your academic portal.
                    </p>
                </div>

                <div className="role-switch">

                    <button
                        type="button"
                        className={role === "student" ? "selected" : ""}
                        onClick={() => setRole("student")}
                    >
                        Student
                    </button>

                    <button
                        type="button"
                        className={role === "teacher" ? "selected" : ""}
                        onClick={() => setRole("teacher")}
                    >
                        Teacher
                    </button>

                </div>

                <form onSubmit={handleLogin}>

                    <label>Email address</label>

                    <div className="input-wrapper">
                        <Mail size={18} />

                        <input
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) =>
                                setEmail(e.target.value)
                            }
                            required
                        />
                    </div>

                    <label>Password</label>

                    <div className="input-wrapper">
                        <Lock size={18} />

                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) =>
                                setPassword(e.target.value)
                            }
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className="login-button"
                    >
                        Sign in
                    </button>

                </form>

                <p className="demo-note">
                    Frontend demo mode
                </p>

            </div>
        </div>
    );
}

export default Login;