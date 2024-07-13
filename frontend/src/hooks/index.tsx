import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

export interface BlogInterface {
  id: string;
  content: string;
  title: string;
  author: {
    name: string;
  };
}
function useBlogs() {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<BlogInterface[]>([]);

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setBlogs(response.data.blog);
        setLoading(false);
      });
  }, []);

  return {
    loading,
    blogs,
  };
}

function useBlog({ id }: { id: string }) {
  const [loading, setLoading] = useState(true);
  const [fullBlog, setFullBlog] = useState<BlogInterface>();

  useEffect(() => {
    axios
      .get(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      })
      .then((response) => {
        setFullBlog(response.data.blog);
        setLoading(false);
      });
  }, [id]);

  return {
    loading,
    fullBlog,
  };
}
export { useBlogs, useBlog };
