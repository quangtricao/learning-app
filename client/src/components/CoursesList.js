import { Button, Grid } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import Course from "./Course";

import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../reducers/modal";

const CoursesList = () => {
  const dispatch = useDispatch();
  const courses = useSelector((store) => store.course);
  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 10,
        }}
      >
        <h2>Your Courses List</h2>
        <Button onClick={() => dispatch(openModal({ type: "create" }))}>
          <AddCircleOutlineIcon fontSize="large" />
        </Button>
      </div>

      <Grid container spacing={3}>
        {courses.map((course) => {
          return (
            <Grid item key={course.title}>
              <Course course={course} />
            </Grid>
          );
        })}
      </Grid>
    </>
  );
};
export default CoursesList;
