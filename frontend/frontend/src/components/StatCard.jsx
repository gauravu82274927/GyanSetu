function StatCard({ title, value, description, icon: Icon }) {
    return (
        <div className="stat-card">
            <div className="stat-card-top">
                <div className="stat-icon">
                    <Icon size={20} />
                </div>
            </div>

            <p className="stat-title">{title}</p>
            <h3>{value}</h3>
            <p className="stat-description">{description}</p>
        </div>
    );
}

export default StatCard;