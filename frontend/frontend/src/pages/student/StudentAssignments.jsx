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
                        title="Assignments"
                        description="View and manage your academic assignments."
                    />

                    <div className="content-card">
                        Assignments page coming next.
                    </div>
                </section>
            </main>
        </div>
    );
}

export default StudentAssignments;