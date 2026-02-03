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

/**
 * MATERIALS API
 */

// Get all materials (optional project filter & search)
server.get("/api/materials", (req, res) => {
  const { project_id, search } = req.query;
  let materials = router.db.get("materials").value() || [];

  // Filter by project
  if (project_id) {
    materials = materials.filter((m) => m.project_id === project_id);
  }

  // Search by material name
  if (search) {
    const searchLower = search.toLowerCase();
    materials = materials.filter((m) =>
      m.material_name.toLowerCase().includes(searchLower),
    );
  }

  res.json(materials);
});

// Get material by ID
server.get("/api/materials/:id", (req, res) => {
  const material = router.db
    .get("materials")
    .find({ material_id: Number(req.params.id) })
    .value();

  if (!material) {
    return res.status(404).json({ error: "Material not found" });
  }

  res.json(material);
});

// Create material
server.post("/api/materials", (req, res) => {
  try {
    const newMaterial = {
      material_id: Date.now(),
      material_name: req.body.material_name,
      installation_cost: req.body.installation_cost || 0,
      consumed_qty: req.body.consumed_qty || 0,
      total_qty: req.body.total_qty || 0,
      consumed_percent: req.body.consumed_percent || 0,
      updated_by: req.body.updated_by || "System",
      updated_at: new Date().toISOString(),
      project_id: req.body.project_id || null,
    };

    router.db.get("materials").push(newMaterial).write();

    res.status(201).json(newMaterial);
  } catch (error) {
    res.status(500).json({ error: "Failed to create material" });
  }
});

// Update material
server.put("/api/materials/:id", (req, res) => {
  const material = router.db
    .get("materials")
    .find({ material_id: Number(req.params.id) });

  if (!material.value()) {
    return res.status(404).json({ error: "Material not found" });
  }

  material
    .assign({
      ...req.body,
      updated_at: new Date().toISOString(),
    })
    .write();

  res.json(material.value());
});

// Delete material
server.delete("/api/materials/:id", (req, res) => {
  router.db
    .get("materials")
    .remove({ material_id: Number(req.params.id) })
    .write();

  res.json({ message: "Material deleted successfully" });
});

/**
 * LABOURS API
 */

// Get all labours (optional project filter & search)
server.get("/api/labours", (req, res) => {
  const { project_id, search, type } = req.query;
  let labours = router.db.get("labours").value() || [];

  // Filter by project
  if (project_id) {
    labours = labours.filter((l) => l.project_id === project_id);
  }

  // Filter by type (Supervisor / Labour)
  if (type) {
    labours = labours.filter((l) => l.type === type);
  }

  // Search by name or mobile
  if (search) {
    const searchLower = search.toLowerCase();
    labours = labours.filter(
      (l) =>
        l.name.toLowerCase().includes(searchLower) || l.mobile.includes(search),
    );
  }

  res.json(labours);
});

// Get labour by ID
server.get("/api/labours/:id", (req, res) => {
  const labour = router.db
    .get("labours")
    .find({ labour_id: Number(req.params.id) })
    .value();

  if (!labour) {
    return res.status(404).json({ error: "Labour not found" });
  }

  res.json(labour);
});

// Create labour
server.post("/api/labours", (req, res) => {
  try {
    const newLabour = {
      labour_id: Date.now(),
      name: req.body.name,
      mobile: req.body.mobile,
      type: req.body.type || "Labour",
      updated_by: req.body.updated_by || "System",
      updated_at: new Date().toISOString(),
      project_id: req.body.project_id || null,
    };

    router.db.get("labours").push(newLabour).write();
    res.status(201).json(newLabour);
  } catch (error) {
    res.status(500).json({ error: "Failed to create labour" });
  }
});

// Update labour
server.put("/api/labours/:id", (req, res) => {
  const labour = router.db
    .get("labours")
    .find({ labour_id: Number(req.params.id) });

  if (!labour.value()) {
    return res.status(404).json({ error: "Labour not found" });
  }

  labour
    .assign({
      ...req.body,
      updated_at: new Date().toISOString(),
    })
    .write();

  res.json(labour.value());
});

// Delete labour
server.delete("/api/labours/:id", (req, res) => {
  router.db
    .get("labours")
    .remove({ labour_id: Number(req.params.id) })
    .write();

  res.json({ message: "Labour deleted successfully" });
});

/**
 * TOOLS & TACKLES API
 */

// Get all tools (optional project filter & search)
server.get("/api/tools", (req, res) => {
  const { project_id, search, usage } = req.query;
  let tools = router.db.get("tools_tackles").value() || [];

  // Filter by project
  if (project_id) {
    tools = tools.filter((t) => t.project_id === project_id);
  }

  // Filter by usage (Existing / New / Rented)
  if (usage) {
    tools = tools.filter((t) => t.usage === usage);
  }

  // Search by equipment name or make
  if (search) {
    const searchLower = search.toLowerCase();
    tools = tools.filter(
      (t) =>
        t.equipment_name.toLowerCase().includes(searchLower) ||
        t.make.toLowerCase().includes(searchLower),
    );
  }

  res.json(tools);
});

// Get tool by ID
server.get("/api/tools/:id", (req, res) => {
  const tool = router.db
    .get("tools_tackles")
    .find({ tool_id: Number(req.params.id) })
    .value();

  if (!tool) {
    return res.status(404).json({ error: "Tool not found" });
  }

  res.json(tool);
});

// Create tool
server.post("/api/tools", (req, res) => {
  try {
    const newTool = {
      tool_id: Date.now(),
      equipment_name: req.body.equipment_name,
      equipment_type: req.body.equipment_type,
      make: req.body.make,
      usage: req.body.usage || "Existing",
      quantity: req.body.quantity || 0,
      updated_by: req.body.updated_by || "System",
      updated_at: new Date().toISOString(),
      project_id: req.body.project_id || null,
    };

    router.db.get("tools_tackles").push(newTool).write();
    res.status(201).json(newTool);
  } catch (error) {
    res.status(500).json({ error: "Failed to create tool" });
  }
});

// Update tool
server.put("/api/tools/:id", (req, res) => {
  const tool = router.db
    .get("tools_tackles")
    .find({ tool_id: Number(req.params.id) });

  if (!tool.value()) {
    return res.status(404).json({ error: "Tool not found" });
  }

  tool
    .assign({
      ...req.body,
      updated_at: new Date().toISOString(),
    })
    .write();

  res.json(tool.value());
});

// Delete tool
server.delete("/api/tools/:id", (req, res) => {
  router.db
    .get("tools_tackles")
    .remove({ tool_id: Number(req.params.id) })
    .write();

  res.json({ message: "Tool deleted successfully" });
});

server.get("/api/documents", (req, res) => {
  const { project_id, status, search } = req.query;

  let documents = router.db.get("documents").value() || [];

  // Filter by project
  if (project_id) {
    documents = documents.filter(
      (d) => String(d.project_id) === String(project_id),
    );
  }

  // Filter by status
  if (status) {
    documents = documents.filter((d) => d.status === status);
  }

  // Search by title or type
  if (search) {
    const searchLower = search.toLowerCase();
    documents = documents.filter(
      (d) =>
        d.title.toLowerCase().includes(searchLower) ||
        d.type.toLowerCase().includes(searchLower),
    );
  }

  res.json(documents);
});

// Get document by ID
server.get("/api/documents/:id", (req, res) => {
  const document = router.db
    .get("documents")
    .find({ doc_id: Number(req.params.id) })
    .value();

  if (!document) {
    return res.status(404).json({ error: "Document not found" });
  }

  res.json(document);
});

server.use(router);

const PORT = 8001;
server.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`);
});
