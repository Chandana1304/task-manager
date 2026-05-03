// const express = require("express");
// const router = express.Router();
// const Task = require("../models/Task");
// const Project = require("../models/Project");
// const auth = require("../middleware/auth");

// router.get("/", auth, async (req, res) => {
//   try {
//     let taskFilter = {};
//     let projectFilter = {};

//     if (req.user.role === "Member") {
//       taskFilter = {
//         $or: [{ createdBy: req.user.id }, { assignedTo: req.user.id }],
//       };
//       projectFilter = {};
//     }

//     const tasks = await Task.find(taskFilter);
//     const projects = await Project.find(projectFilter);

//     const totalTasks = tasks.length;
//     const completedTasks = tasks.filter((t) => t.status === "done").length;
//     const pendingTasks = tasks.filter((t) => t.status === "pending").length;
//     const inProgressTasks = tasks.filter(
//       (t) => t.status === "in-progress",
//     ).length;
//     const overdueTasks = tasks.filter(
//       (t) =>
//         t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done",
//     ).length;

//     res.json({
//       role: req.user.role,
//       totalProjects: projects.length,
//       totalTasks,
//       completedTasks,
//       pendingTasks,
//       inProgressTasks,
//       overdueTasks,
//     });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

// module.exports = router;

// const express = require("express");
// const router = express.Router();
// const Task = require("../models/Task");
// const Project = require("../models/Project");
// const auth = require("../middleware/auth");

// router.get("/", auth, async (req, res) => {
//   try {
//     let taskFilter = {};
//     let projectFilter = {};

//     if (req.user.role === "Member") {
//       taskFilter = {
//         $or: [{ createdBy: req.user.id }, { assignedTo: req.user.id }],
//       };
//       projectFilter = {};
//     }

//     const tasks = await Task.find(taskFilter);
//     const projects = await Project.find(projectFilter);

//     const totalTasks = tasks.length;
//     const completedTasks = tasks.filter((t) => t.status === "done").length;
//     const pendingTasks = tasks.filter((t) => t.status === "pending").length;
//     const inProgressTasks = tasks.filter(
//       (t) => t.status === "in-progress",
//     ).length;
//     const overdueTasks = tasks.filter(
//       (t) =>
//         t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done",
//     ).length;

//     res.json({
//       role: req.user.role,
//       totalProjects: projects.length,
//       totalTasks,
//       completedTasks,
//       pendingTasks,
//       inProgressTasks,
//       overdueTasks,
//     });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const Project = require("../models/Project");
const auth = require("../middleware/auth");

router.get("/", auth, async (req, res) => {
  try {
    let taskFilter = {};
    let projectFilter = {};

    if (req.user.role === "Member") {
      taskFilter = {
        $or: [{ createdBy: req.user.id }, { assignedTo: req.user.id }],
      };
    }

    const tasks = await Task.find(taskFilter);
    const projects = await Project.find(projectFilter);

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "done").length;
    const pendingTasks = tasks.filter((t) => t.status === "pending").length;
    const inProgressTasks = tasks.filter(
      (t) => t.status === "in-progress",
    ).length;
    const overdueTasks = tasks.filter(
      (t) =>
        t.dueDate && new Date(t.dueDate) < new Date() && t.status !== "done",
    ).length;

    res.json({
      role: req.user.role,
      totalProjects: projects.length,
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      overdueTasks,
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;