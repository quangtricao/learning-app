import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CoursesList from "./components/CoursesList";

const App = () => {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/*" element={<CoursesList />} />
      </Routes>
    </>
  );
};

export default App;
