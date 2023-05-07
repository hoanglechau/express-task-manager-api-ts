import Task from "../models/Task";
import asyncWrapper from "../middleware/async";
import { createCustomError } from "../errors/custom-error";

// Refactored function to get all tasks
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
});

// Old get all tasks function
/*
const getAllTasks = asyncWrapper(async (req, res) => {
  try {
    // mongoose static function to get all tasks
    const tasks = await Task.find({});
    res.status(200).json({ tasks });
    // Some other ways to set response status:
    //res.status(200).json({tasks, amount: tasks.length})
    //res.status(200).json({status:'success',data:{tasks, nbHits:tasks.length}})
  } catch (error) {
    res.status(500).json({ msg: error });
  }
});
*/

// Refactored function to create a new task
const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

/*
// Create a new task
const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};
*/

// Refactored function to get single task
const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOne({ _id: taskID });

  // Check whether the task exists or not
  if (!task) {
    // Custom error class
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

/*
// Get an individual task with its id
const getTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOne({ _id: taskID });

    // Check whether the task exists or not
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    // This is in case the syntax for the id is wrong
    res.status(500).json({ msg: error });
  }
};
*/

// Refactored function to update a single task
const updateTask = asyncWrapper(async (req, res, next) => {
  // get the id from the request's parameters
  const { id: taskID } = req.params;
  // Include the options to return new values and run validators for the request's parameters
  const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
    new: true,
    runValidators: true
  });

  // Check whether the task exists or not
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

/*
// Update a single task
const updateTask = async (req, res) => {
  try {
    // get the id from the request's parameters
    const { id: taskID } = req.params;
    // Include the options to return new values and run validators for the request's parameters
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true
    });

    // Check whether the task exists or not
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    // This is in case the syntax for the id is wrong
    res.status(500).json({ msg: error });
  }
};
*/

// Quite similar to update task, used to check the functionality of PUT
/*
const editTask = async (req, res) => {
  try {
    // get the id from the request's parameters
    const { id: taskID } = req.params;
    // Include the options to return new values and run validators for the request's parameters
    const task = await Task.findOneAndUpdate({ _id: taskID }, req.body, {
      new: true,
      runValidators: true,
      overwrite: true
    });

    // Check whether the task exists or not
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    // This is in case the syntax for the id is wrong
    res.status(500).json({ msg: error });
  }
};
*/

// Refactored function to delete a single task
const deleteTask = asyncWrapper(async (req, res, next) => {
  const { id: taskID } = req.params;
  const task = await Task.findOneAndDelete({ _id: taskID });

  // Check whether the task exists or not
  if (!task) {
    return next(createCustomError(`No task with id: ${taskID}`, 404));
  }
  res.status(200).json({ task });
});

/*
// Delete a single task
const deleteTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });

    // Check whether the task exists or not
    if (!task) {
      return res.status(404).json({ msg: `No task with id: ${taskID}` });
    }
    res.status(200).json({ task });
  } catch (error) {
    // This is in case the syntax for the id is wrong
    res.status(500).json({ msg: error });
  }
};
*/

export {
  getAllTasks,
  createTask,
  getTask,
  updateTask,
  deleteTask
  //editTask
};
