import { useState } from "react"
import { useQuery } from "@tanstack/react-query"
import { fetchBlogs } from "../api/blogs"
import BlogCard from "./BlogCard"
import CreateBlog from "./CreateBlog"
import { Button } from "./ui/button"

type Props = {
  selectedId: number | null
  onSelect: (id: number) => void
}

function BlogList({ selectedId, onSelect }: Props) {
  const [showCreate, setShowCreate] = useState(false)

  const { data, isLoading, error } = useQuery({
    queryKey: ["blogs"],
    queryFn: fetchBlogs,
  })

  if (isLoading) {
    return <div className="px-2 text-slate-500">Loading blogs...</div>
  }

  if (error) {
    return <div className="px-2 text-red-600">Failed to load blogs</div>
  }

  return (
    <aside className="pr-2 flex flex-col h-full">
      <h2 className="text-lg font-semibold text-slate-900 mb-5">
        Latest Articles
      </h2>

      {/* Blog cards */}
      <div
        className="
          max-h-[calc(100vh-100px)]
          overflow-y-auto
          space-y-5
          pr-2
          scrollbar-hide
        "
      >
        {data?.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            isActive={selectedId === blog.id}
            onClick={() => onSelect(blog.id)}
          />
        ))}
      </div>

      {/* Create blog section (shadcn Button) */}
      <div className="pt-4 mt-4 border-t">
        <Button
          variant="outline"
          className="w-full"
          onClick={() => setShowCreate(!showCreate)}
        >
          {showCreate ? "Close Create Blog" : "+ Create Blog"}
        </Button>

        {showCreate && (
          <div className="mt-4">
            <CreateBlog />
          </div>
        )}
      </div>
    </aside>
  )
}

export default BlogList
