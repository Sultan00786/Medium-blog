import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Root() {
   const router = useNavigate();

   useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) router("/blogs");
      else router("/signin");
   });
   return <div>Root</div>;
}

export default Root;
