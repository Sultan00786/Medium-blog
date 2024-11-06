import axios from "axios";
import { useEffect, useState } from "react";
import { blogApi } from "../controllers/apiUrl";

const { GET_ALL_BLOGS, GET_BLOG } = blogApi;

interface BlogType {
   title: string;
   content: string;
   id: number;
   createdAt: string;
   author: {
      name: null | string;
   };
}


export function useGetAllBlogs() {
   const [loading, setLoading] = useState(true);
   const [blogs, setBlogs] = useState<BlogType[]>([]);

   useEffect(() => {
      axios
         .get(GET_ALL_BLOGS, {
            headers: {
               authorization: localStorage.getItem("token"),
            },
         })
         .then((result) => {
            setBlogs(result.data.blogs);
            setLoading(false);
         });
   }, []);

   return {
      blogs,
      loading,
   };
}

export function useGetBlog(id: string) {
   const [blog, setBlog] = useState<BlogType>({
      title: "",
      content: "",
      id: 0,
      createdAt: "",
      author: {
         name: null,
      },
   });
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      axios
         .get(GET_BLOG + `/${id}`, {
            headers: {
               authorization: localStorage.getItem("token"),
            },
         })
         .then((result) => {
            setBlog(result.data.blog);
            setLoading(false);
         });
   }, []);

   return {
      blog,
      loading,
   };
}
