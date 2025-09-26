function Hero() {
  return (
    <section className="relative overflow-hidden mb-8">
      <div className="bg-animated" />
      <div className="glass rounded-2xl p-8 md:p-12">
        <div className="flex flex-col md:flex-row items-center gap-8">
          <div className="flex-1">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
              Compete. Climb. Conquer.
            </h1>
            <p className="mt-3 text-gray-300 max-w-prose">
              Join tournaments across top titles, track your ascent on live leaderboards,
              and manage your dream team—all in one portal.
            </p>
            <div className="mt-6 flex gap-3">
              <a href="#tournaments" className="btn-primary">Browse Tournaments</a>
              <a href="/register" className="btn-secondary">Get Started</a>
            </div>
          </div>
          <div className="flex-1 grid grid-cols-2 gap-3 w-full">
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-3xl">🏆</div>
              <div className="mt-2 text-sm text-gray-300">Weekly Events</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-3xl">⚔️</div>
              <div className="mt-2 text-sm text-gray-300">Top Titles</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-3xl">📈</div>
              <div className="mt-2 text-sm text-gray-300">Live Rankings</div>
            </div>
            <div className="glass rounded-xl p-4 text-center">
              <div className="text-3xl">🤝</div>
              <div className="mt-2 text-sm text-gray-300">Team Play</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;


