import { Modal, Box, Typography, TextField, Select, MenuItem, Button } from "@mui/material";

import { useDispatch, useSelector } from "react-redux";

import { createCourse } from "../reducers/course";
import { closeModal } from "../reducers/modal";

import { useField } from "../customHooks/input";

const style = {
  position: "absolute",
  top: "10%",
  left: "30%",
  width: "40%",
  height: "auto",
  bgcolor: "background.paper",
  boxShadow: 20,
  p: 4,
};

const multilineExample = `Overview
* Note 1
* Note 2`;

const CreateModal = () => {
  const title = useField("text");
  const body = useField("text");
  const link = useField("text");
  const status = useField("text");
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    const newCourObj = {
      title: title.fields.value,
      body: body.fields.value,
      link: link.fields.value,
      status: status.fields.value,
    };
    dispatch(createCourse(newCourObj));
    dispatch(closeModal());
  };

  return (
    <>
      <Typography variant="h5" component="h2">
        Add new course
      </Typography>

      <Typography sx={{ mt: 5 }}>Title</Typography>
      <TextField sx={{ mt: 2 }} autoFocus fullWidth {...title.fields} placeholder="ReactJS" />

      <Typography sx={{ mt: 2 }}>Course overview or self-notes</Typography>
      <TextField fullWidth multiline rows={6} placeholder={multilineExample} {...body.fields} />

      <Typography sx={{ mt: 2 }}>Course link</Typography>
      <TextField fullWidth {...link.fields} placeholder="https://react.dev/learn" />

      <Typography sx={{ mt: 2 }}>Status</Typography>
      <Select sx={{ width: "30%" }} {...status.fields}>
        <MenuItem value={"To study"}>To study</MenuItem>
        <MenuItem value={"In progess"}>In progess</MenuItem>
        <MenuItem value={"Completed"}>Completed</MenuItem>
      </Select>

      <Button sx={{ mt: 2, width: "30%", left: "40%" }} type="button" onClick={handleSubmit}>
        Create
      </Button>
    </>
  );
};
const EditModal = ({ course }) => {
  const title = useField("text", course.title);
  const body = useField("text", course.body);
  const link = useField("text", course.link);
  const status = useField("text", course.status);
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log({
      title: title.fields.value,
      body: body.fields.value,
      link: link.fields.value,
      status: status.fields.value,
    });

    dispatch(closeModal());
  };

  return (
    <>
      <Typography variant="h5" component="h2">
        Title
      </Typography>
      <TextField fullWidth {...title.fields} />

      <Typography sx={{ mt: 2 }}>Course overview or self-notes</Typography>
      <TextField fullWidth multiline rows={6} {...body.fields} />

      <Typography sx={{ mt: 2 }}>Course link</Typography>
      <TextField fullWidth {...link.fields} />

      <Typography sx={{ mt: 2 }}>Status</Typography>
      <Select sx={{ width: "30%" }} {...status.fields}>
        <MenuItem value={"To study"}>To study</MenuItem>
        <MenuItem value={"In progess"}>In progess</MenuItem>
        <MenuItem value={"Completed"}>Completed</MenuItem>
      </Select>

      <Button sx={{ mt: 2, width: "30%", left: "40%" }} type="button" onClick={handleSubmit}>
        Update
      </Button>
    </>
  );
};

const ModalComponent = () => {
  const dispatch = useDispatch();
  const modal = useSelector((store) => store.modal);

  return (
    <>
      {!modal ? null : (
        <Modal open={modal.open} onClose={() => dispatch(closeModal())}>
          <Box sx={style}>
            {modal.type === "create" ? <CreateModal /> : <EditModal course={modal.course} />}
          </Box>
        </Modal>
      )}
    </>
  );
};

export default ModalComponent;
