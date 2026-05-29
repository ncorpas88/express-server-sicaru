// ℹ️ Loads environment variables from a .env file into process.env
try {
  process.loadEnvFile()
} catch(error) {
  console.warn(".env file not found, using default environment values")
}

// ℹ️ Establishes a connection to the database
require("./db");

// Imports Express (a Node.js framework for handling HTTP requests) and initializes the server
const express = require("express");
const cors = require("cors")
const app = express();

app.use(
  cors({
    origin: "http://localhost:5174",
  })
)

// ℹ️ Loads and applies global middleware (CORS, JSON parsing, etc.) for server configurations
const config = require("./config")
config(app);

// 👇 Defines and applies route handlers
const indexRouter = require("./routes/index.routes");
app.use("/api", indexRouter);

// ❗ Centralized error handling (must be placed after routes)
const handleErrors = require("./errors")
handleErrors(app);

// ℹ️ Defines the server port (default: 5005)
const PORT = process.env.PORT || 5005;

app.listen(PORT, () => {
  console.log(`Server listening. Local access on http://localhost:${PORT}`);
});
