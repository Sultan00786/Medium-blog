import { useState } from "react";
import NavBar from "../components/NavBar";
import Loader from "../components/Loader";
import axios from "axios";
import { blogApi } from "../controllers/apiUrl";

export default function Publish() {
   const [title, setTitle] = useState("");
   const [content, setContent] = useState("");
   const [isPublic, setIsPublic] = useState(true);
   const [loading, setLoading] = useState(false);

   const handlerPublish = async () => {
        setLoading(true);
      try {
         console.log({ title, content, isPublic });
         await axios.post(
            blogApi.CREATE_BLOG,
            {
               title,
               content,
               publish: isPublic,
            },
            {
               headers: {
                  authorization: localStorage.getItem("token"),
               },
            }
         );
      } catch (error) {
         console.log(error);
      }
        setLoading(false);
   };

   if (loading) return <Loader />;

   return (
      <div>
         <NavBar />
         <div className=" w-4/6 h-screen flex flex-col gap-6 mx-auto my-10 ">
            <div className=" flex gap-3 items-center">
               <div onClick={handlerPublish}>
                  <AddCircle />
               </div>
               <input
                  type="text"
                  id="title"
                  className=" border-l-2 border-gray-400 focus:outline-none text-gray-900 text-4xl block w-full p-2.5"
                  placeholder="Title"
                  onChange={(e) => setTitle(e.target.value)}
               />
            </div>
            <textarea
               id="content"
               rows={15}
               className="block p-2.5 w-full text-lg text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:outline-none"
               placeholder="Write your thoughts here..."
               onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <div className=" flex gap-2 text-lg items-center">
               <input
                  type="checkbox"
                  checked={isPublic}
                  onChange={() => setIsPublic((prev) => !prev)}
               />
               <label>Public</label>
            </div>
         </div>
      </div>
   );
}

function AddCircle() {
   return (
      <div className=" relative w-10 h-10 flex items-center justify-center p-2 rounded-full border-[2px] border-gray-600 cursor-pointer hover:bg-gray-900 group ">
         <div className=" absolute bottom-[3px] text-3xl text-gray-600 group-hover:text-white ">
            +
         </div>
      </div>
   );
}
