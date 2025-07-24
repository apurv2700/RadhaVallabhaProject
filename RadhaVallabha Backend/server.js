const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Static folder
app.use('/uploads', express.static('uploads'));
// Routes
app.get("/api/hello", (_, res) => res.json({ message: "Hello from Node.js backend!" }));
app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/userRoutes"));
app.use("/api", require("./routes/festivalRoutes"));

// Get port and host from .env (fallback if not set)
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST|| "192.168.1.43";


// Server
app.listen(PORT, () => {
  console.log(`Server running on http://${HOST}:${PORT}`);
});

