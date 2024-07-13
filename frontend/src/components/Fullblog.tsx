import { BlogInterface } from "../hooks";
import { Appbar } from "./Appbar";
import { Avatar } from "./BlogCard";

function Fullblog({ blog }: { blog: BlogInterface }) {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center px-12">
        <div className="grid grid-cols-12 pt-12 max-w-screen-xl">
          <div className="col-span-8 max-w-2xl">
            <div className="text-5xl font-extrabold">{blog.title}</div>
            <div className="text-slate-500 pt-4">Posted on July 12,2024</div>
            <div className="text-gray-600 pt-4 text-lg">{blog.content}</div>
          </div>
          <div className="col-span-4">
            <div className="font-bold">Author</div>
            <div className="flex pt-5">
              <div className="flex flex-col justify-center pr-4">
                <Avatar author={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-2xl font-bold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="text-lg text-slate-500 pt-2">
                  This is the catchphrase about the author , defining him and
                  his ability
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export { Fullblog };
