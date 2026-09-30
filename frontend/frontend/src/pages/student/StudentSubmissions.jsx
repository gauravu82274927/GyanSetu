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
                        title="Submissions"
                        description="View and manage your academic submissions."
                    />

                    <div className="content-card">
                        Submissions page coming next.
                    </div>
                </section>
            </main>
        </div>
    );
}

export default StudentAssignments;