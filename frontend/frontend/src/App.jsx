import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import StudentDashboard from "./StudentDashboard";
import TeacherDashboard from "./TeacherDashboard";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />

                <Route
                    path="/student-dashboard"
                    element={<StudentDashboard />}
                />

                <Route
                    path="/teacher-dashboard"
                    element={<TeacherDashboard />}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;