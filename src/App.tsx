import { useState } from "react"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Footer from "./components/Footer"
import BlogList from "./components/BlogList"
import BlogDetail from "./components/BlogDetail"

function App() {
  const [selectedId, setSelectedId] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      <Navbar />
      <Hero />

      <main className="flex-1">
        <div className="max-w-[1440px] mx-auto px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-[360px_1fr] gap-10">
            
            {/* Left panel */}
            <BlogList
              selectedId={selectedId}
              onSelect={setSelectedId}
            />

            {/* Right panel */}
            <BlogDetail blogId={selectedId} />

          </div>

        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
