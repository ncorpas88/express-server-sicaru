// ℹ️ Middleware to handle 404 and generic errors in the application

function handleErrors(app) {
  
  // ℹ️ Handles requests to undefined routes (404 Not Found)
  app.use((req, res, next) => {
    res.status(404).json({ message: "This route does not exist" });
  });

  // ℹ️ Centralized generic error handling middleware. whenever you call next(error), this middleware will handle the error
  app.use((err, req, res, next) => {

    // always logs the error
    console.error("ERROR", req.method, req.path, err);

    if (res.headersSent) return;

    // MongoDB duplicate key error (e.g. unique username/email already exists)
    if (err.code === 11000) {
      const field = Object.keys(err.keyValue || {})[0] || "campo";
      return res.status(400).json({
        errorMessage: `Ya existe un registro con ese ${field}`,
      });
    }

    // Mongoose validation error
    if (err.name === "ValidationError") {
      const messages = Object.values(err.errors).map((e) => e.message);
      return res.status(400).json({
        errorMessage: messages.join(", "),
      });
    }

    res.status(500).json({
      message: "Internal server error. Check the server console for details",
    });
  });
};

module.exports = handleErrors