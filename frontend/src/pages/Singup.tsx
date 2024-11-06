import React from "react";
import Auth from "../components/auth/Auth";
import Quote from "../components/auth/Quote";

const Singup = () => {
   return (
      <div className="">
         <div className=" grid grid-cols-1 lg:grid-cols-2 ">
            <div>
               <Auth type="Sign up" />
            </div>
            <div className=" invisible lg:visible">
               <Quote />
            </div>
         </div>
      </div>
   );
};

export default Singup;
