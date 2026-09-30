import Sidebar from "../../components/Sidebar";
import Topbar from "../../components/Topbar";
import PageHeader from "../../components/PageHeader";

function StudentAssignments() {
    return (
        <div className="app-layout">
            <Sidebar />

            <main className="main-content">
                <Topbar />

                <section className="page-content">
                    <PageHeader
                        title="Profile"
                        description="View and manage your personal profile."
                    />

                    <div className="content-card">
                        Profile page coming next.
                    </div>
                </section>
            </main>
        </div>
    );
}

export default StudentAssignments;