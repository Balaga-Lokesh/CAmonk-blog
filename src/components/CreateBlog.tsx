import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"

type BlogInput = {
  title: string
  description: string
  content: string
  category: string
  coverImage: string
}

async function createBlog(blog: BlogInput) {
  const res = await fetch("http://localhost:3001/blogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...blog,
      category: blog.category.split(",").map(c => c.trim()),
      date: new Date().toISOString(),
    }),
  })

  if (!res.ok) {
    throw new Error("Failed to create blog")
  }

  return res.json()
}

export default function CreateBlog() {
  const queryClient = useQueryClient()

  const [form, setForm] = useState<BlogInput>({
    title: "",
    description: "",
    content: "",
    category: "",
    coverImage: "",
  })

  const mutation = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] })
      setForm({
        title: "",
        description: "",
        content: "",
        category: "",
        coverImage: "",
      })
      alert("Blog created successfully ✅")
    },
  })

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    mutation.mutate(form)
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
      <h3 className="text-lg font-semibold text-slate-900">
        Create New Blog
      </h3>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          name="title"
          placeholder="Blog title"
          value={form.title}
          onChange={handleChange}
          required
          className="w-full border rounded-md px-3 py-2 text-sm"
        />

        <input
          name="category"
          placeholder="Categories (comma separated)"
          value={form.category}
          onChange={handleChange}
          required
          className="w-full border rounded-md px-3 py-2 text-sm"
        />

        <input
          name="coverImage"
          placeholder="Cover image URL"
          value={form.coverImage}
          onChange={handleChange}
          required
          className="w-full border rounded-md px-3 py-2 text-sm"
        />

        <textarea
          name="description"
          placeholder="Short blog description"
          value={form.description}
          onChange={handleChange}
          required
          rows={2}
          className="w-full border rounded-md px-3 py-2 text-sm"
        />

        <textarea
          name="content"
          placeholder="Full blog content (plain text)"
          rows={5}
          value={form.content}
          onChange={handleChange}
          required
          className="w-full border rounded-md px-3 py-2 text-sm"
        />

        <button
          type="submit"
          disabled={mutation.isPending}
          className="w-full bg-indigo-600 text-white rounded-md py-2 text-sm font-medium hover:bg-indigo-700 transition"
        >
          {mutation.isPending ? "Creating..." : "Create Blog"}
        </button>

        {mutation.isError && (
          <p className="text-xs text-red-600">
            Failed to create blog. Try again.
          </p>
        )}
      </form>
    </div>
  )
}
