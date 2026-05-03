const Project = require("../models/Project");
const Task = require("../models/Task");

exports.getDashboard = async (req, res) => {
  try {
    const completed = await Task.countDocuments({ status: "done" });
    const overdue = await Task.countDocuments({
      status: { $ne: "done" },
      dueDate: { $lt: new Date() },
    });
    const projects = await Project.countDocuments();
    const tasks = await Task.countDocuments();

    res.json({
      completed,
      overdue,
      projects,
      tasks,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
