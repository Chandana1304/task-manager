const Task = require("../models/Task");

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate("project", "name")
      .sort({ createdAt: -1 });

    res.json(
      tasks.map((task) => ({
        _id: task._id,
        title: task.title,
        status: task.status,
        project: task.project?._id || null,
        projectName: task.project?.name || "No Project",
        dueDate: task.dueDate,
      })),
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, project, dueDate } = req.body;

    const task = await Task.create({
      title,
      project,
      dueDate: dueDate || null,
      createdBy: req.user.id,
    });

    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(task);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
