function TeamManagement() {
  const myTeam = {
    name: "Team Alpha",
    members: ["Alice", "Bob", "Charlie"],
  };

  return (
    <div>
      <h1 className="page-title">Team Management</h1>
      <div className="card">
        <h2 className="text-xl font-semibold">{myTeam.name}</h2>
        <ul className="list-disc list-inside mt-2 text-gray-300">
          {myTeam.members.map((m, i) => (
            <li key={i}>{m}</li>
          ))}
        </ul>
        <button className="mt-4 btn-primary">
          Add Member
        </button>
      </div>
    </div>
  );
}

export default TeamManagement;