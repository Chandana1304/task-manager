// const express = require("express");
// const router = express.Router();
// const Task = require("../models/Task");
// const Project = require("../models/Project");
// const auth = require("../middleware/auth");
// const role = require("../middleware/role");

// // ---------------- CREATE TASK ----------------
// router.post("/", auth, async (req, res) => {
//   try {
//     const { title, description, project, dueDate, status, assignedTo } =
//       req.body;

//     if (!title || !project) {
//       return res.status(400).json({ msg: "Title and project are required" });
//     }

//     const existingProject = await Project.findById(project);
//     if (!existingProject) {
//       return res.status(404).json({ msg: "Project not found" });
//     }

//     const task = await Task.create({
//       title,
//       description: description || "",
//       project,
//       dueDate: dueDate || null,
//       status: status || "pending",
//       assignedTo: assignedTo || req.user.id,
//       createdBy: req.user.id,
//     });

//     const populatedTask = await Task.findById(task._id)
//       .populate("assignedTo", "name email role")
//       .populate("createdBy", "name email role")
//       .populate("project", "name description");

//     res.status(201).json(populatedTask);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

// // ---------------- GET TASKS ----------------
// router.get("/", auth, async (req, res) => {
//   try {
//     let filter = {};

//     if (req.user.role === "Member") {
//       filter = {
//         $or: [{ createdBy: req.user.id }, { assignedTo: req.user.id }],
//       };
//     }

//     const tasks = await Task.find(filter)
//       .populate("assignedTo", "name email role")
//       .populate("createdBy", "name email role")
//       .populate("project", "name description")
//       .sort({ createdAt: -1 });

//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

// // ---------------- UPDATE TASK ----------------
// router.put("/:id", auth, async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);

//     if (!task) {
//       return res.status(404).json({ msg: "Task not found" });
//     }

//     if (
//       req.user.role !== "Admin" &&
//       task.createdBy.toString() !== req.user.id &&
//       (task.assignedTo ? task.assignedTo.toString() !== req.user.id : true)
//     ) {
//       return res.status(403).json({ msg: "Not allowed to update this task" });
//     }

//     const allowedUpdates =
//       req.user.role === "Admin"
//         ? req.body
//         : {
//             title: req.body.title ?? task.title,
//             description: req.body.description ?? task.description,
//             status: req.body.status ?? task.status,
//             dueDate: req.body.dueDate ?? task.dueDate,
//           };

//     const updatedTask = await Task.findByIdAndUpdate(
//       req.params.id,
//       allowedUpdates,
//       {
//         new: true,
//       },
//     )
//       .populate("assignedTo", "name email role")
//       .populate("createdBy", "name email role")
//       .populate("project", "name description");

//     res.json(updatedTask);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

// // ---------------- DELETE TASK (ADMIN ONLY) ----------------
// router.delete("/:id", auth, role("Admin"), async (req, res) => {
//   try {
//     const task = await Task.findByIdAndDelete(req.params.id);

//     if (!task) {
//       return res.status(404).json({ msg: "Task not found" });
//     }

//     res.json({ msg: "Task deleted successfully" });
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
// const role = require("../middleware/role");

// // ---------------- CREATE TASK ----------------
// router.post("/", auth, async (req, res) => {
//   try {
//     const { title, description, project, dueDate, status, assignedTo } =
//       req.body;

//     if (!title || !project) {
//       return res.status(400).json({ msg: "Title and project are required" });
//     }

//     const existingProject = await Project.findById(project);
//     if (!existingProject) {
//       return res.status(404).json({ msg: "Project not found" });
//     }

//     const task = await Task.create({
//       title,
//       description: description || "",
//       project,
//       dueDate: dueDate || null,
//       status: status || "pending",
//       assignedTo: assignedTo || req.user.id,
//       createdBy: req.user.id,
//     });

//     const populatedTask = await Task.findById(task._id)
//       .populate("assignedTo", "name email role")
//       .populate("createdBy", "name email role")
//       .populate("project", "name description");

//     res.status(201).json(populatedTask);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

// // ---------------- GET TASKS ----------------
// router.get("/", auth, async (req, res) => {
//   try {
//     let filter = {};

//     if (req.user.role === "Member") {
//       filter = {
//         $or: [{ createdBy: req.user.id }, { assignedTo: req.user.id }],
//       };
//     }

//     const tasks = await Task.find(filter)
//       .populate("assignedTo", "name email role")
//       .populate("createdBy", "name email role")
//       .populate("project", "name description")
//       .sort({ createdAt: -1 });

//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

// // ---------------- UPDATE TASK ----------------
// router.put("/:id", auth, async (req, res) => {
//   try {
//     const task = await Task.findById(req.params.id);

//     if (!task) {
//       return res.status(404).json({ msg: "Task not found" });
//     }

//     if (
//       req.user.role !== "Admin" &&
//       task.createdBy.toString() !== req.user.id &&
//       (task.assignedTo ? task.assignedTo.toString() !== req.user.id : true)
//     ) {
//       return res.status(403).json({ msg: "Not allowed to update this task" });
//     }

//     const allowedUpdates =
//       req.user.role === "Admin"
//         ? req.body
//         : {
//             title: req.body.title ?? task.title,
//             description: req.body.description ?? task.description,
//             status: req.body.status ?? task.status,
//             dueDate: req.body.dueDate ?? task.dueDate,
//           };

//     const updatedTask = await Task.findByIdAndUpdate(
//       req.params.id,
//       allowedUpdates,
//       {
//         new: true,
//       },
//     )
//       .populate("assignedTo", "name email role")
//       .populate("createdBy", "name email role")
//       .populate("project", "name description");

//     res.json(updatedTask);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

// // ---------------- DELETE TASK (ADMIN ONLY) ----------------
// router.delete("/:id", auth, role("Admin"), async (req, res) => {
//   try {
//     const task = await Task.findByIdAndDelete(req.params.id);

//     if (!task) {
//       return res.status(404).json({ msg: "Task not found" });
//     }

//     res.json({ msg: "Task deleted successfully" });
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
const role = require("../middleware/role");

// ---------------- CREATE TASK ----------------
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, project, dueDate, status, assignedTo } =
      req.body;

    if (!title || !project) {
      return res.status(400).json({ msg: "Title and project are required" });
    }

    const existingProject = await Project.findById(project);
    if (!existingProject) {
      return res.status(404).json({ msg: "Project not found" });
    }

    const task = await Task.create({
      title,
      description: description || "",
      project,
      dueDate: dueDate || null,
      status: status || "pending",
      assignedTo: assignedTo || req.user.id,
      createdBy: req.user.id,
    });

    const populatedTask = await Task.findById(task._id)
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role")
      .populate("project", "name description");

    res.status(201).json(populatedTask);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ---------------- GET TASKS ----------------
router.get("/", auth, async (req, res) => {
  try {
    let filter = {};

    if (req.user.role === "Member") {
      filter = {
        $or: [{ createdBy: req.user.id }, { assignedTo: req.user.id }],
      };
    }

    const tasks = await Task.find(filter)
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role")
      .populate("project", "name description")
      .sort({ createdAt: -1 });

    res.json(tasks);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ---------------- UPDATE TASK ----------------
router.put("/:id", auth, async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    if (
      req.user.role !== "Admin" &&
      task.createdBy.toString() !== req.user.id &&
      (task.assignedTo ? task.assignedTo.toString() !== req.user.id : true)
    ) {
      return res.status(403).json({ msg: "Not allowed to update this task" });
    }

    const allowedUpdates =
      req.user.role === "Admin"
        ? req.body
        : {
            title: req.body.title ?? task.title,
            description: req.body.description ?? task.description,
            status: req.body.status ?? task.status,
            dueDate: req.body.dueDate ?? task.dueDate,
          };

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      allowedUpdates,
      {
        new: true,
      },
    )
      .populate("assignedTo", "name email role")
      .populate("createdBy", "name email role")
      .populate("project", "name description");

    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ---------------- DELETE TASK (ADMIN ONLY) ----------------
router.delete("/:id", auth, role("Admin"), async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ msg: "Task not found" });
    }

    res.json({ msg: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;