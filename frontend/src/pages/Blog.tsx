import { Fullblog } from "../components/Fullblog";
import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { Appbar } from "../components/Appbar";
import { BlogSkeleton } from "../components/BlogSkeleton";

function Blog() {
  const { id } = useParams();
  console.log(id);

  const { loading, fullBlog } = useBlog({ id: id || "" });
  if (loading === true || !fullBlog) {
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
      <Fullblog blog={fullBlog} />
    </div>
  );
}

export { Blog };
