const StatsCard = ({ icon, title, value, growth, iconBg = "bg-primary" }) => {
  return (
    <div className="bg-card border border-border rounded-[24px] p-6 shadow-sm">
      <div className="flex items-start justify-between mb-6">
        <div className={`w-14 h-14 rounded-2xl ${iconBg} text-white flex items-center justify-center text-2xl`}>
          {icon}
        </div>

        {growth ? (
          <span className="text-green-600 font-medium text-[16px]">
            ↗ {growth}
          </span>
        ) : (
          <span />
        )}
      </div>

      <h3 className="text-[20px] font-semibold mb-2">{value}</h3>
      <p className="text-muted-foreground">{title}</p>
    </div>
  );
};

export default StatsCard;