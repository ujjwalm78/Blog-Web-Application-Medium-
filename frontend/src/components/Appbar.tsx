import { Avatar } from "./BlogCard";
import { Link } from "react-router-dom";

function Appbar() {
  return (
    <div className="flex justify-between border -b px-10 py-5">
      <Link to={"/blogs"}>Medium</Link>
      <div>
        <Link to={"/publish"}>
          <button
            type="button"
            className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 mr-4"
          >
            Publish
          </button>
        </Link>
        <Avatar author="ujjwal" />
      </div>
    </div>
  );
}

export { Appbar };
