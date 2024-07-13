import { BlogCard } from "../components/BlogCard";
import { Appbar } from "../components/Appbar";
import { useBlogs } from "../hooks";
import { BlogSkeleton } from "../components/BlogSkeleton";
function Blogs() {
  const { loading, blogs } = useBlogs();
  if (loading === true) {
    return (
      <div>
        <Appbar />
        <div className="flex justify-center">
          <div>
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
            <BlogSkeleton />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="max-w-3xl min-w-96">
          {blogs.map((blog) => (
            <BlogCard
              id={blog.id}
              key={blog.id}
              title={blog.title}
              content={blog.content}
              author={blog.author.name || "Ujjwal"}
              publishedDate="11th July 2024"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export { Blogs };
