import { Route, Routes } from "react-router-dom";
import Blog from "./pages/Blog";
import Signin from "./pages/Signin";
import Singup from "./pages/Singup";

function App() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<Singup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </>
  );
}

export default App;
