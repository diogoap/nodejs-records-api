const express = require('express');
const { Router } = require("express");
const recordsController = require("../controllers/recordsController");
const router = Router();
const app = express();

// API controllers
app.use(express.json());
app.use("/api", router);

router.get("/health", (req, res) => res.json("OK - " + new Date().toISOString()));
router.post("/records", recordsController.findRecords);

module.exports = app;
