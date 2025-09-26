function StatCard({ label, value, icon }) {
  return (
    <div className="glass rounded-xl p-5 flex items-center gap-3">
      <div className="text-2xl">{icon}</div>
      <div>
        <div className="text-sm text-gray-400">{label}</div>
        <div className="text-xl font-bold">{value}</div>
      </div>
    </div>
  );
}

export default StatCard;


