import React from "react";
import { Avatar } from "./blog/BlogCard";
import { Link } from "react-router-dom";

function NavBar() {
   return (
      <div className="flex justify-between items-center px-12 py-3 border-2 border-gray-200">
         <h1 className=" text-2xl font-serif font-semibold">
            Medium
         </h1>
         <div className=" flex gap-6 items-center justify-center">
            <Link to={"/publish"}>
               <button
                  type="button"
                  className=" h-min text-sm text-green-700 hover:text-white border border-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-full px-4 py-2 text-center"
               >
                  New
               </button>
            </Link>
            <Avatar size="large" username="Sultan" />
         </div>
      </div>
   );
}

export default NavBar;
