import { useParams } from "react-router-dom";
import { useGetBlog } from "../hook/hook";
import Loader from "../components/Loader";
import { handlerDateParse } from "../components/util/util";
import NavBar from "../components/NavBar";
import { Avatar } from "../components/blog/BlogCard";

function Blog() {
   const { id } = useParams();
   const { blog, loading } = useGetBlog(id || "");

   if (loading) return <Loader />;

   return (
      <div>
         <NavBar />
         <div className=" grid lg:grid-cols-12 gap-10 lg:px-[200px] md:px-[150px] px-[50px] py-16">
            <div className=" flex flex-col gap-2 col-span-8">
               <h1 className=" text-4xl font-bold">
                  {blog.title}
               </h1>
               <p className=" text-gray-500 font-semibold">
                  Post on {handlerDateParse(blog.createdAt)}
               </p>
               <p className=" text-gray-900 font-semibold">
                  {blog.content}
               </p>
            </div>
            <div className="flex col-span-4">
               <div className=" flex flex-col gap-3 items-center">
                  <p className="text-gray-500 font-semibold">
                     Author
                  </p>
                  <Avatar
                     size="large"
                     username={blog.author.name || "Unknown"}
                  />
               </div>
               <div className=" w-full pt-9">
                  <p className=" text-xl font-bold">
                     {blog.author.name || "Unknown"}
                  </p>
                  <p className="w-4/5">
                     Random catch phrase about the author's
                     ability to grab the user's attention
                  </p>
               </div>
            </div>
         </div>
      </div>
   );
}

export default Blog;
