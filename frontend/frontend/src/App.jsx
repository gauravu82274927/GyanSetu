import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import StudentAssignmentDetail from "./pages/student/StudentAssignmentDetail";
import StudentDashboard from "./pages/student/StudentDashBoard";
import StudentAssignments from "./pages/student/StudentAssignments";
import StudentSubmissions from "./pages/student/StudentSubmissions";
import StudentAttendance from "./pages/student/StudentAttendance";
import StudentProfile from "./pages/student/StudentProfile";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route
                    path="/student/dashboard"
                    element={<StudentDashboard />}
                />

                <Route
                    path="/student/assignments"
                    element={<StudentAssignments />}
                />

                <Route
                    path="/student/assignments/:id"
                    element={<StudentAssignmentDetail />}
                />

                <Route
                    path="/student/submissions"
                    element={<StudentSubmissions />}
                />

                <Route
                    path="/student/attendance"
                    element={<StudentAttendance />}
                />

                <Route
                    path="/student/profile"
                    element={<StudentProfile />}
                />

                <Route
                    path="*"
                    element={<Navigate to="/" replace />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;