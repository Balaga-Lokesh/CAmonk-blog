import { GraduationCap } from "lucide-react"

function Navbar() {
  return (
    <header className="bg-white border-b border-slate-200">
      <div className="max-w-[1440px] mx-auto px-6 h-16 flex items-center justify-between">
        
        {/* Left: Logo */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-indigo-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold text-slate-900">
            CA MONK
          </span>
        </div>

        {/* Center nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
          <a href="#" className="hover:text-slate-900">Tools</a>
          <a href="#" className="hover:text-slate-900">Practice</a>
          <a href="#" className="hover:text-slate-900">Events</a>
          <a href="#" className="hover:text-slate-900">Job Board</a>
          <a href="#" className="hover:text-slate-900">Points</a>
        </nav>

        {/* Right */}
        <button className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 transition">
          Profile
        </button>

      </div>
    </header>
  )
}

export default Navbar
