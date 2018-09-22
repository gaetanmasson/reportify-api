const express = require("express");

const userRoutes = require("../../user/user.route.v1");
const authRoutes = require("../../auth/auth.route.v1");

const router = express.Router();

/**
 * GET v1/status
 */
router.get("/status", (req, res) => res.send("OK"));

/**
 * GET v1/docs
 */
router.use("/docs", express.static("docs"));

router.use("/users", userRoutes);
router.use("/auth", authRoutes);

module.exports = router;
