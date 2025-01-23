import { ChangeEvent, FormEventHandler, useState } from "react";
import { SingupType } from "@sultanali001/medium-common";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { authApi } from "../../controllers/apiUrl";

const { CREATE_NEW_USER, LOGIN_USER } = authApi;

interface FormLabelType {
   type?: string;
   label: string;
   name: string;
   placeholder: string;
   onchange: onChangeType;
}

type onChangeType = (event: ChangeEvent<HTMLInputElement>, s: string) => void;

function Auth({ type }: { type: "Sign up" | "Sign in" }) {
   const navigate = useNavigate();

   const [singUpIP, setSignUpIP] = useState<SingupType>({
      name: "",
      email: "",
      password: "",
   });

   const handlerIPChange: onChangeType = (e, name) => {
      setSignUpIP({
         ...singUpIP,
         [name]: e.target.value,
      });
   };

   const handlerSubmit: FormEventHandler<HTMLFormElement> = async (event) => {
      event.preventDefault();
      try {
         let token;
         if (type === "Sign up")
            token = await axios.post(CREATE_NEW_USER, singUpIP);
         else token = await axios.post(LOGIN_USER, singUpIP);

         console.log(token);

         if (token.data.jwt) {
            localStorage.setItem("token", token.data.jwt);
            navigate("/blogs");
         }
      } catch (error) {
         console.error(error);
      }
   };

   return (
      <div className=" h-screen flex justify-center items-center">
         <div className=" w-[54%]">
            <h1 className=" text-4xl font-bold text-center">
               {type === "Sign up"
                  ? "Create an account"
                  : "Welcome Back to Login"}
            </h1>
            <p className=" text-center text-slate-500 text-lg font-semibold">
               {type === "Sign up"
                  ? "Already have an account? "
                  : "Continue with your journey!! "}
               <span
                  onClick={() =>
                     navigate(type === "Sign up" ? "/signin" : "/signup")
                  }
                  className=" underline hover:text-blue-400 cursor-pointer"
               >
                  {type === "Sign up" ? "Login" : "New user"}
               </span>
            </p>

            <form onSubmit={handlerSubmit} className=" mt-6">
               <div>
                  {type === "Sign up" && (
                     <FormLabel
                        label="Username"
                        name="name"
                        placeholder="Enter your name"
                        onchange={handlerIPChange}
                     />
                  )}
                  <FormLabel
                     label="Email"
                     name="email"
                     placeholder="n@example.com"
                     onchange={handlerIPChange}
                  />
                  <FormLabel
                     label="Password"
                     name="password"
                     placeholder="******"
                     onchange={handlerIPChange}
                     type="password"
                  />
               </div>
               <button
                  type="submit"
                  className=" w-full p-2 mt-4 bg-gray-900 text-gray-50 rounded-lg hover:scale-[1.03] transition-all duration-[280]"
               >
                  {type}
               </button>
            </form>
         </div>
      </div>
   );
}

export const FormLabel = ({
   type,
   label,
   name,
   placeholder,
   onchange,
}: FormLabelType) => {
   return (
      <div>
         <label className="block mb-2 mt-5 font-medium text-gray-900">
            {label}
            {name != "name" && <sup className=" text-red-600"> *</sup>}
         </label>
         <input
            type={type || "text"}
            id={label}
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            placeholder={placeholder}
            onChange={(e) => {
               onchange(e, name);
            }}
            required={name != "name"}
         />
      </div>
   );
};

export default Auth;
