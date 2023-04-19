import { Card, CardActions, CardContent, Button, Typography } from "@mui/material";

import { useDispatch } from "react-redux";
import { openModal } from "../reducers/modal";

const Course = ({ course }) => {
  const dispatch = useDispatch();
  const handleDelete = () => {};

  let newText = course.body.split("\n").map((item, i) => (
    <Typography variant="body2" color="text.secondary" key={i}>
      {item}
    </Typography>
  ));

  let color = "red";
  if (course.status === "In progess") {
    color = "yellow";
  }
  if (course.status === "Completed") {
    color = "green";
  }

  return (
    <>
      <Card sx={{ maxWidth: 345 }}>
        <div style={{ backgroundColor: `${color}`, height: 20 }}></div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course.title}
          </Typography>

          {newText}

          <Typography>{course.link}</Typography>
          <Typography>Course progess: {course.status}</Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={() => dispatch(openModal({ course, type: "edit" }))}>
            Edit
          </Button>
          <Button size="small" onClick={handleDelete}>
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Course;
