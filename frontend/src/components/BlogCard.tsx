import { Link } from "react-router-dom";

interface BlogInterface {
  author: string;
  title: string;
  content: string;
  publishedDate: string;
  id: string;
}
function BlogCard({
  author,
  title,
  content,
  publishedDate,
  id,
}: BlogInterface) {
  return (
    <Link to={`/blog/${id}`}>
      <div className="p-4 border-b border-slate-200 pb-4">
        <div className="flex">
          <div className="flex flex-col justify-center">
            <Avatar author={author} />
          </div>
          <div className="flex flex-col justify-center font-extralight pl-2 text-sm">
            {author}
          </div>
          <div className="flex flex-col justify-center pl-2 text-slate-500 font-thin text-sm">
            {publishedDate}
          </div>
        </div>
        <div className="text-xl font-semibold pt-2">{title}</div>
        <div className="text-md font-thin">
          {content.slice(0, 200) + " ..."}
        </div>
        <div className="text-slate-500 text-sm font-thin pt-4">
          {Math.ceil(content.length / 100) + " minute(s) read"}
        </div>
      </div>
    </Link>
  );
}

function Avatar({ author }: { author: string }) {
  return (
    <div className="relative inline-flex items-center justify-center w-6 h-6 overflow-hidden bg-gray-100 rounded-full dark:bg-gray-600">
      <span className=" text-gray-600 dark:text-gray-300 text-xs font-extralight">
        {author[0]}
      </span>
    </div>
  );
}

export { BlogCard, Avatar };
