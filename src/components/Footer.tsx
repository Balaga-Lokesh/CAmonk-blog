import { GraduationCap } from "lucide-react"

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-20">
      <div className="max-w-[1440px] mx-auto px-6 py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 bg-white rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-slate-900" />
              </div>
              <span className="text-lg font-bold text-white">
                CA MONK
              </span>
            </div>
            <p className="text-sm leading-relaxed">
              Empowering the next generation of financial leaders with tools,
              community, and knowledge.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide">
              Resources
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white">Blog</a></li>
              <li><a href="#" className="hover:text-white">Webinars</a></li>
              <li><a href="#" className="hover:text-white">Case Studies</a></li>
            </ul>
          </div>

          {/* Platform */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide">
              Platform
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white">Job Board</a></li>
              <li><a href="#" className="hover:text-white">Practice Tests</a></li>
              <li><a href="#" className="hover:text-white">Mentorship</a></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-sm font-semibold text-slate-300 mb-4 uppercase tracking-wide">
              Connect
            </h3>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-white">LinkedIn</a></li>
              <li><a href="#" className="hover:text-white">Twitter</a></li>
              <li><a href="#" className="hover:text-white">Instagram</a></li>
            </ul>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">
            © 2024 CA Monk. All rights reserved.
          </p>

          <div className="flex gap-6 text-xs">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer
