import BlogCard from "../components/blog/BlogCard";
import Loader from "../components/Loader";
import NavBar from "../components/NavBar";
import { handlerDateParse } from "../components/util/util";
import { useGetAllBlogs } from "../hook/hook";

function Blogs() {
   const { blogs, loading } = useGetAllBlogs();

   console.log(blogs);

   if (loading) return <Loader />;

   return (
      <div>
         <NavBar />
         <div className=" py-4">
            {blogs.map((blog, index) => {
               // some date operation to get perfect formate of the given blog date

               return (
                  <BlogCard
                     id={blog.id}
                     content={blog.content}
                     title={blog.title}
                     date={handlerDateParse(blog.createdAt)}
                     name={blog.author.name || "Unknown"}
                     isLast={index + 1 === blogs.length}
                  />
               );
            })}
         </div>
      </div>
   );
}

export default Blogs;
