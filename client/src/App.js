import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CoursesList from "./components/CoursesList";
import UsersList from "./components/UsersList";
import EditCreateModal from "./components/Modal";

const App = () => {
  return (
    <>
      <Navbar />
      <EditCreateModal />

      <Routes>
        <Route path="/*" element={<CoursesList />} />
        <Route path="/users" element={<UsersList />} />
        <Route path="/profile" element={<UsersList />} />
      </Routes>
    </>
  );
};

export default App;
