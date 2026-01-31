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
server.post("/api/send_otp", (req, res) => {
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
server.post("/api/verify_otp", (req, res) => {
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

server.use(router);

const PORT = 8001;
server.listen(PORT, () => {
  console.log(`JSON Server running on port ${PORT}`);
});
