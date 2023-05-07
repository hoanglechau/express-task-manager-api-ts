// Description: This file contains all the routes for the tasks
import express from "express";

const router = express.Router();

// import controllers
import {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
  //editTask
} from "../controllers/tasks";

// define routes
// can include .put(editTask) for PUT method
router.route("/").get(getAllTasks).post(createTask);
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

export default router;
