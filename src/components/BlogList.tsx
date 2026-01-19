import { useQuery } from "@tanstack/react-query"
import { fetchBlogs } from "../api/blogs"
import BlogCard from "./Blogcard"

type Props = {
  selectedId: number | null
  onSelect: (id: number) => void
}

function BlogList({ selectedId, onSelect }: Props) {
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
    <aside className="pr-2">
  <h2 className="text-lg font-semibold text-slate-900 mb-5">
    Latest Articles
  </h2>

  <div
    className="
      max-h-[calc(100vh-101px)]
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
</aside>

  )
}

export default BlogList
