// ℹ️ Mongoose (ODM) handles the connection to MongoDB and provides schema-based modeling.
const mongoose = require("mongoose");

if (!process.env.MONGODB_URI) {
  console.error("FATAL: MONGODB_URI environment variable is not set!");
  process.exit(1);
}

// ℹ️ Connects to MongoDB using the URI from environment variables.
mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    const dbName = x.connections[0].name;
    console.log(`Connected to Mongo! Database name: "${dbName}"`);
  })
  .catch((err) => {
    console.error("FATAL: Error connecting to mongo: ", err.message);
  });
