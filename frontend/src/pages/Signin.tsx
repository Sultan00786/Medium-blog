import Auth from "../components/auth/Auth";
import Quote from "../components/auth/Quote";

const Signin = () => {
   return (
      <div className=" grid grid-cols-1 lg:grid-cols-2 ">
         <div>
            <Auth type="Sign in" />
         </div>
         <div className=" invisible lg:visible">
            <Quote />
         </div>
      </div>
   );
};

export default Signin;
