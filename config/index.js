const express = require("express");

// LOGGER
const logger = require("morgan");

// CORS
const cors = require("cors");

function config(app) {
  // TRUST PROXY
  app.set("trust proxy", 1);

  // CORS
  app.use(
    cors({
      origin: process.env.ORIGIN,

      credentials: true,
    }),
  );

  // LOGGER
  app.use(logger("dev"));

  // JSON
  app.use(express.json());

  // URL ENCODED
  app.use(
    express.urlencoded({
      extended: false,
    }),
  );
}

module.exports = config;
