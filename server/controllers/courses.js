const coursesRouter = require("express").Router();
const Course = require("../models/course");

coursesRouter.get("/", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "Unauthorized. Token missing or invalid" });
  }

  const courses = await Course.find({}).populate("user", { username: 1 });

  response.json(courses);
});

coursesRouter.post("/", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "Unauthorized. Token missing or invalid" });
  }
  const user = request.user;

  const newCourse = new Course({ ...request.body, user: user.id });
  const savedCourse = await newCourse.save();

  user.courses = user.courses.concat(savedCourse._id);
  await user.save();

  const returnedCourse = await Course.findById(savedCourse._id).populate("user", { username: 1 });

  response.status(201).json(returnedCourse);
});

coursesRouter.delete("/:id", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "Unauthorized. Token missing or invalid" });
  }
  const user = request.user;

  const courseToBeDeleted = await Course.findById(request.params.id);
  if (!courseToBeDeleted) {
    return response.status(204).end();
  }

  // remove blog's ID from "blogs" field in "users" collection
  user.courses = user.courses.filter(
    (course) => course._id.toString() !== courseToBeDeleted._id.toString()
  );
  await user.save();

  // remove Blog in "blogs" collection
  await Course.findByIdAndRemove(request.params.id);

  response.status(204).end();
});

coursesRouter.put("/:id", async (request, response) => {
  if (!request.user) {
    return response.status(401).json({ error: "Unauthorized. Token missing or invalid" });
  }

  const course = request.body;

  const updatedCourse = await Course.findByIdAndUpdate(request.params.id, course, {
    new: true,
    runValidators: true,
    context: "query",
  }).populate("user", { username: 1 });

  response.json(updatedCourse);
});

module.exports = coursesRouter;
