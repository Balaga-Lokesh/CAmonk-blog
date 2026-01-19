import type { Blog } from "../api/blogs"
import React from "react"
import { TrendingUp, Briefcase, Landmark, Cpu, BookOpen,} from "lucide-react"

const categoryIconMap: Record<string, React.ReactNode> = {
  FINANCE: <TrendingUp className="w-3.5 h-3.5" />,
  CAREER: <Briefcase className="w-3.5 h-3.5" />,
  REGULATIONS: <Landmark className="w-3.5 h-3.5" />,
  SKILLS: <BookOpen className="w-3.5 h-3.5" />,
  TECHNOLOGY: <Cpu className="w-3.5 h-3.5" />,
}

type Props = {
  blog: Blog
  onClick: () => void
  isActive: boolean
}

function BlogCard({ blog, onClick, isActive }: Props) {
  const primaryCategory = blog.category[0]

  return (
    <div
      onClick={onClick}
      className={`
        relative cursor-pointer rounded-xl bg-white p-5 transition
        ${isActive ? "shadow-md" : "shadow-sm hover:shadow-md"}
      `}
    >
      {isActive && (
        <span className="absolute left-0 top-4 bottom-4 w-1 rounded-r bg-indigo-500" />
      )}

      {/* Meta */}
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-indigo-600">
          {categoryIconMap[primaryCategory]}
          {primaryCategory}
        </div>
        <span className="text-xs text-slate-400">
          {new Date(blog.date).toLocaleDateString()}
        </span>
      </div>

      <h3 className="text-sm font-semibold text-slate-900 leading-snug mb-1">
        {blog.title}
      </h3>

      <p className="text-sm text-slate-500 leading-relaxed line-clamp-2 mb-4">
        {blog.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {blog.category.map((tag) => (
          <span
            key={tag}
            className="text-[11px] px-3 py-1 rounded-full bg-slate-100 text-slate-600"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default BlogCard
