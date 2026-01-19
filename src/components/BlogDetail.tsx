import { useQuery } from "@tanstack/react-query"
import { fetchBlogById } from "../api/blogs"
import { Share2, ThumbsUp, MessageCircle } from "lucide-react"

type Props = {
  blogId: number | null
}

function formatBlogContent(raw: string) {
  const blocks = raw.split(/\n\s*\n/)
  let html = ""
  let list: string[] = []

  const flushList = () => {
    if (list.length) {
      html += `<ul>${list.map(i => `<li>${i}</li>`).join("")}</ul>`
      list = []
    }
  }

  blocks.forEach((block, index) => {
    const text = block.trim()
    if (!text) return

    /* SECTION HEADINGS (short blocks) */
    if (index !== 0 && text.length < 70) {
      flushList()
      html += `<h2>${text}</h2>`
      return
    }

    /* INTRODUCING LIST */
    if (text.endsWith(":")) {
      flushList()
      html += `<p><strong>${text}</strong></p>`
      return
    }

    /* BULLET POINTS */
    if (text.startsWith("- ") || text.startsWith("• ")) {
      list.push(text.replace(/^[-•]\s*/, ""))
      return
    }

    /* QUOTE / CALLOUT */
    if (text.startsWith('"') || text.startsWith("“")) {
      flushList()
      html += `<blockquote>${text.replace(/["“”]/g, "")}</blockquote>`
      return
    }

    /* NORMAL PARAGRAPH WITH HIGHLIGHTS */
    flushList()

     html += `<p>${text}</p>`
  })

  flushList()
  return html
}

function BlogDetail({ blogId }: Props) {
  if (!blogId) {
    return (
      <div className="bg-white rounded-2xl shadow-sm p-16 text-center text-slate-500">
        <p className="text-lg font-medium mb-2">
          Select an article to start reading
        </p>
        <p className="text-sm">
          Choose from the latest articles on the left
        </p>
      </div>
    )
  }

  const { data, isLoading, error } = useQuery({
    queryKey: ["blog", blogId],
    queryFn: () => fetchBlogById(blogId),
  })

  if (isLoading) {
    return <div className="bg-white rounded-2xl p-10">Loading article...</div>
  }

  if (error || !data) {
    return (
      <div className="bg-white rounded-2xl p-10 text-red-600">
        Failed to load article
      </div>
    )
  }

  return (
    <article className="bg-white rounded-2xl shadow-sm overflow-hidden">
      {/* Image */}
      <img
        src={data.coverImage}
        alt={data.title}
        className="w-full h-[480px] object-cover"
      />

      <div className="p-8">
        {/* Meta */}
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 uppercase mb-3">
          <span>{data.category[0]}</span>
          <span>·</span>
          <span>5 min read</span>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold text-slate-900 mb-4 leading-tight">
          {data.title}
        </h1>

        {/* Share Button */}
        <button className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm font-medium hover:bg-indigo-700 transition">
          <Share2 className="w-4 h-4" />
          Share Article
        </button>

        {/* Info Cards */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="bg-slate-50 rounded-lg p-4 text-center">
            <div className="text-xs text-slate-500 uppercase mb-1">Category</div>
            <div className="text-sm font-semibold text-slate-900">{data.category[0]}</div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 text-center">
            <div className="text-xs text-slate-500 uppercase mb-1">Read Time</div>
            <div className="text-sm font-semibold text-slate-900">5 Mins</div>
          </div>

          <div className="bg-slate-50 rounded-lg p-4 text-center">
            <div className="text-xs text-slate-500 uppercase mb-1">Date</div>
            <div className="text-sm font-semibold text-slate-900">
              {new Date(data.date).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}
            </div>
          </div>
        </div>

        {/* Intro paragraph */}
        <p className="text-lg leading-relaxed text-slate-700 mb-8">
          {data.description}
        </p>

        {/* Content - Dynamic from backend */}
        <div 
  className="
    prose prose-slate max-w-none mb-8

    /* Headings */
    prose-headings:text-slate-900
    prose-headings:font-bold
    prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3

    /* Paragraphs */
    prose-p:text-[17px]
    prose-p:text-slate-700
    prose-p:leading-[1.75]
    prose-p:mb-6

    /* Lists */
    prose-ul:my-6
    prose-ul:space-y-3
    prose-li:text-slate-700
    prose-li:leading-relaxed

    /* Highlight important lines (strong) */
    prose-strong:text-indigo-600
    prose-strong:font-semibold

    /* Blockquote / Callout */
    prose-blockquote:border-l-4
    prose-blockquote:border-indigo-600
    prose-blockquote:bg-indigo-50
    prose-blockquote:text-indigo-900
    prose-blockquote:not-italic
    prose-blockquote:pl-6
    prose-blockquote:py-4
    prose-blockquote:my-10
    prose-blockquote:rounded-r-lg

    /* Inline highlight support */
    prose-mark:bg-indigo-100
    prose-mark:text-indigo-900
    prose-mark:px-1
    prose-mark:rounded
  "
  dangerouslySetInnerHTML={{
  __html: formatBlogContent(data.content),
}}

/>

        {/* Divider */}
        <hr className="my-8 border-slate-200" />

        {/* Author + actions */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-slate-300 flex items-center justify-center">
              <span className="text-slate-600 text-sm font-semibold">AM</span>
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Written by Arjun Mehta
              </p>
              <p className="text-xs text-slate-500">
                Senior Financial Analyst
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button className="hover:text-indigo-600 transition">
              <ThumbsUp className="w-5 h-5" />
            </button>
            <button className="hover:text-indigo-600 transition">
              <MessageCircle className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}

export default BlogDetail