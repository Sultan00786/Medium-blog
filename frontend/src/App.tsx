import { Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog.tsx";
import Signin from "./pages/Signin";
import Singup from "./pages/Singup";
import Blogs from "./pages/Blogs.tsx";
import Publish from "./pages/Publish.tsx";

function App() {
   return (
      <>
         <Routes>
            <Route path="/signup" element={<Singup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/blog/:id" element={<Blog />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/publish" element={<Publish />} />
         </Routes>
      </>
   );
}

export default App;
