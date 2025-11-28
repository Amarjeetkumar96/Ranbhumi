function Footer() {
  return (
    <footer className="mt-12">
      <div className="glass rounded-2xl p-6 text-sm text-gray-300 flex flex-col md:flex-row items-center justify-between gap-3">
        <div>© 2025 Gaming Tournament Portal</div>
        <div className="flex items-center gap-4">
          <a href="/Ranbhumi/leaderboard" className="hover:text-yellow-300">Leaderboard</a>
          <a href="/Ranbhumi/schedule" className="hover:text-yellow-300">Schedule</a>
          <a href="/Ranbhumi/login" className="hover:text-yellow-300">Login</a>
        </div>
        <div className="flex items-center gap-3 text-lg">
          <a aria-label="Twitter" className="hover:opacity-80" href="#">𝕏</a>
          <a aria-label="Discord" className="hover:opacity-80" href="#">🎧</a>
          <a aria-label="YouTube" className="hover:opacity-80" href="#">▶️</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;