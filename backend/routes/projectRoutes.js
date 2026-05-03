// const express = require("express");
// const router = express.Router();
// const Project = require("../models/Project");
// const auth = require("../middleware/auth");
// const role = require("../middleware/role");

// // ---------------- CREATE PROJECT (ADMIN ONLY) ----------------
// router.post("/", auth, role("Admin"), async (req, res) => {
//   try {
//     const { name, description } = req.body;

//     if (!name) {
//       return res.status(400).json({ msg: "Project name is required" });
//     }

//     const project = await Project.create({
//       name,
//       description: description || "",
//       createdBy: req.user.id,
//     });

//     res.status(201).json(project);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

// // ---------------- GET PROJECTS (ALL LOGGED USERS) ----------------
// router.get("/", auth, async (req, res) => {
//   try {
//     const projects = await Project.find()
//       .populate("createdBy", "name email role")
//       .sort({ createdAt: -1 });

//     res.json(projects);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

// // ---------------- GET SINGLE PROJECT ----------------
// router.get("/:id", auth, async (req, res) => {
//   try {
//     const project = await Project.findById(req.params.id).populate(
//       "createdBy",
//       "name email role",
//     );

//     if (!project) {
//       return res.status(404).json({ msg: "Project not found" });
//     }

//     res.json(project);
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const auth = require("../middleware/auth");
const role = require("../middleware/role");

// ---------------- CREATE PROJECT (ADMIN ONLY) ----------------
router.post("/", auth, role("Admin"), async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ msg: "Project name is required" });
    }

    const project = await Project.create({
      name,
      description: description || "",
      createdBy: req.user.id,
    });

    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ---------------- GET PROJECTS (ALL LOGGED USERS) ----------------
router.get("/", auth, async (req, res) => {
  try {
    const projects = await Project.find()
      .populate("createdBy", "name email role")
      .sort({ createdAt: -1 });

    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ---------------- GET SINGLE PROJECT ----------------
router.get("/:id", auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate(
      "createdBy",
      "name email role",
    );

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;