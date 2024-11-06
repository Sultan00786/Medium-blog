import { Link } from "react-router-dom";

interface BlogCardPropsTy {
   id: number
   name: string;
   date: string;
   title: string;
   content: string;
   isLast: boolean;
}

export default function BlogCard({
   id,
   name,
   date,
   title,
   content,
   isLast,
}: BlogCardPropsTy) {
   return (
      <div
         className={` w-[85%] lg:w-[45%] mx-auto px-6 ${
            !isLast && "border-b-2 pb-3 mb-8"
         } border-gray-100 `}
      >
         <div className=" flex items-center gap-1 mb-1 text-gray-700">
            <Avatar size="small" username={name} />
            <h3>{name}</h3>
            <SmallDot />
            <h3>{date}</h3>
         </div>
         <Link to={`/blog/${id}`} className=" text-2xl font-bold hover:text-blue-900 cursor-pointer">
            {title}
         </Link>
         <p className=" text-gray-500 font-semibold mt-1">
            {content.substring(0, 150)}...
         </p>

         <p className=" text-gray-500 font-semibold mt-6 mb-2 ">
            {Math.ceil(content.length / 100)} minute read
         </p>
      </div>
   );
}

const SmallDot = () => (
   <div className="w-1 h-1 bg-gray-600/60 rounded-full"></div>
);

export const Avatar = ({
   username,
   size,
}: {
   username: string;
   size: "small" | "large";
}) => {
   return (
      <div
         className={` ${
            size === "small"
               ? "w-5 h-5 text-xs"
               : "w-8 h-8 text-lg"
         } flex justify-center items-center text-center text-white rounded-full bg-purple-950`}
      >
         {username[0]}
      </div>
   );
};
