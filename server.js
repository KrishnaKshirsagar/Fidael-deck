const jsonServer = require("json-server");
const server = jsonServer.create();
const router = jsonServer.router("db.json");
const middlewares = jsonServer.defaults();
const bodyParser = require("body-parser");
const cors = require("cors");

server.use(cors());
server.use(bodyParser.json());
server.use(middlewares);

/**
 * STATIC CONFIG
 */
const STATIC_EMAIL = "test@tt.com";
const STATIC_OTP = "1234";

/**
 * SEND OTP (STATIC)
 */
server.post("/api/auth/send_otp", (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  if (email !== STATIC_EMAIL) {
    return res.status(400).json({ error: "User not found" });
  }

  const db = router.db;

  db.get("users")
    .find({ email })
    .assign({
      otp: STATIC_OTP,
      otpExpiry: null,
      isVerified: false,
    })
    .write();

  console.log(`Static OTP for ${email}: ${STATIC_OTP}`);

  res.json({
    message: "OTP sent successfully",
  });
});

/**
 * VERIFY OTP
 */
server.post("/api/auth/verify_otp", (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ error: "Email and OTP are required" });
  }

  const db = router.db;
  const user = db.get("users").find({ email }).value();

  if (!user) {
    return res.status(400).json({ error: "User not found" });
  }

  if (otp !== STATIC_OTP) {
    return res.status(400).json({ error: "Invalid OTP" });
  }

  db.get("users")
    .find({ email })
    .assign({
      isVerified: true,
      otp: "",
    })
    .write();

  res.json({
    message: "Login successful",
    user: {
      id: user.id,
      email: user.email,
      isVerified: true,
    },
  });
});

// Add these routes after the existing auth routes in server.js

// Projects API
server.get("/api/projects", (req, res) => {
  const { status, search } = req.query;
  let projects = router.db.get("projects").value() || [];

  // Filter by status if provided
  if (status) {
    projects = projects.filter((project) => project.status === status);
  }

  // Search functionality
  if (search) {
    const searchLower = search.toLowerCase();
    projects = projects.filter(
      (project) =>
        project.project_name.toLowerCase().includes(searchLower) ||
        project.location.toLowerCase().includes(searchLower) ||
        project.city.toLowerCase().includes(searchLower),
    );
  }

  res.json(projects);
});

server.get("/api/projects/:id", (req, res) => {
  const project = router.db
    .get("projects")
    .find({ project_id: Number(req.params.id) })
    .value();

  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ error: "Project not found" });
  }
});

server.post("/api/projects", (req, res) => {
  try {
    const newProject = {
      id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    router.db.get("projects").push(newProject).write();
    res.status(201).json(newProject);
  } catch (error) {
    res.status(500).json({ error: "Failed to create project" });
  }
});

server.put("/api/projects/:id", (req, res) => {
  const project = router.db
    .get("projects")
    .find({ project_id: Number(req.params.id) });

  if (!project.value()) {
    return res.status(404).json({ error: "Project not found" });
  }

  project
    .assign({
      ...req.body,
      updated_at: new Date().toISOString(),
    })
    .write();

  res.json(project.value());
});

server.delete("/api/projects/:id", (req, res) => {
  router.db
    .get("projects")
    .remove({ project_id: Number(req.params.id) })
    .write();

  res.json({ message: "Project deleted successfully" });
});

server.use(router);

const PORT = 8001;
server.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`);
});
