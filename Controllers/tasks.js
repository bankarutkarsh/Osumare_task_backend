const fs = require("fs");
const path = require("path");
const dataFile = path.join(__dirname, "../Database/db.json");
let data = require("../Database/db.json");

const err = [];

function saveData() {
  fs.writeFileSync(dataFile, JSON.stringify(data, null, 2), "utf-8");
}

function validateTodo(todo) {
  const symbols = /[<>#$%^&*()=\[\]{};\\|<>\/?]/;

  todo.title.trim();
  todo.description.trim();

  if (!todo.title || todo.title.length < 5) {
    err.push("Title must be at least 5 characters long");
    return false;
  } else if (symbols.test(todo.title)) {
    err.push("Title contains unwanted symbols");
    return false;
  } else if (!todo.description || todo.description.length < 10) {
    err.push("Description must be at least 10 characters long");
    return false;
  } else if (symbols.test(todo.description)) {
    err.push("Description contains unwanted symbols");
    return false;
  } else {
    return true;
  }
}

exports.allTasks = (req, res) => {
  try {
    res
      .status(200)
      .json({ message: "Tasks fetched successfully", task: data.task });
  } catch {
    console.error("Error finding task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getTaskById = (req, res) => {
  const { askedId } = req.params;
  const index = data.task.findIndex((item) => item.id === parseInt(askedId));

  try {
    if (index !== -1) {
      return res
        .status(200)
        .json({ message: "Task fetched successfully", task: data.task[index] });
    }
    res.status(404).json({ message: `Task with id ${askedId} not found.` });
  } catch {
    console.error("Error finding task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.deleteTask = (req, res) => {
  const { askedId } = req.params;
  const index = data.task.findIndex((item) => item.id === parseInt(askedId));

  try {
    if (index === -1) {
      return res
        .status(404)
        .json({ message: `Task with id ${askedId} not found.` });
    }
    const todo = data.task.splice(index, 1);
    saveData();
    res.status(200).json({
      message: "Task deleted successfully",
      deletedTask: todo[0],
    });
  } catch {
    console.error("Error finding task:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.addTask = (req, res) => {
  const { title, description } = req.body;
  const todo = {
    id: data.task.length > 0 ? data.task[data.task.length - 1].id + 1 : 1,
    title: title,
    description: description,
  };

  try {
    if (!validateTodo(todo)) {
      return res
        .status(400)
        .json({ message: err.join(',') });
    }
    data.task.push(todo);

    saveData();

    res.status(200).json({
      message: "Task added successfully",
      addedTask: todo,
    });
  } catch {
    console.log("Error creating task");
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.editTask = (req, res) => {
  const { askedId } = req.params;
  const { title, description } = req.body;
  const index = data.task.findIndex((item) => item.id === parseInt(askedId));
  const todo = {
    id: parseInt(askedId),
    title: title,
    description: description,
  };

  try {
    if (!validateTodo(todo)) {
      return res
        .status(400)
        .json({ message: err.join(',') });
    }
    if (index === -1) {
      return res
        .status(404)
        .json({ message: `Task with id ${askedId} not found.` });
    }
    data.task[index] = todo;
    saveData();
    res.status(200).json({
      message: "Task edited successfully",
      newTask: todo,
    });
  } catch {
    console.log("Error creating task");
    res.status(500).json({ error: "Internal server error" });
  }
};
