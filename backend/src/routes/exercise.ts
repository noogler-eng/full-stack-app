import express from "express";
import Exercise from "../models/excersie.model";

const exerciseRouter = express.Router();

// this route is for exercise trial route
exerciseRouter.get("/", (req, res) => {
  res.json({
    msg: "trial for the exercise route",
  });
});

// route for getting an particular exercise
exerciseRouter.get("/:id", async (req, res) => {
  const id = req.params.id;
  const exercise = await Exercise.findOne({
    id: id,
  });

  res.json(exercise);
});

// deleting the particular exercise
exerciseRouter.delete("/:id", async (req, res) => {
  const id = req.params.id;
  await Exercise.deleteOne({
    id: id,
  });

  res.json({
    msg: `exercise with id: ${id} has been deleted`,
  });
});

// updating the particular exercise
exerciseRouter.put("/:id", async (req, res) => {
  const id = req.params.id;
  const { description, duration, date } = req.body;

  const exercise = await Exercise.findByIdAndUpdate(
    id,
    {
      description: description,
      duration: duration,
      date: date,
    },
    { new: true }
  );

  res.json(exercise);
});

// this will help to add the exercise to the particualr user
exerciseRouter.post("/add-exercise", async (req, res) => {
  const username = req.body.username;
  const { description, duration, date } = req.body;

  const execise = await Exercise.create({
    username: username,
    description: description,
    duration: duration,
    date: date,
  });

  await execise.save();
  res.json({
    msg: "exercise has been created",
  });
});

// getting all the route for the particualr username
exerciseRouter.post("/exercises", async (req, res) => {
  const username = req.body.username;
  const execises = await Exercise.find({
    username: username,
  });

  res.json(execises);
});

export default exerciseRouter;
