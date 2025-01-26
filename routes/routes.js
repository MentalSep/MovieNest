import express from "express";
import Path from "path";
import { fileURLToPath } from "url";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import secret from "../jwt.js";

const router = express.Router();

const dirname = Path.dirname(fileURLToPath(import.meta.url));

router.get("/", (req, res) => {
  res.sendFile(Path.join(dirname, "../public/index.html"));
});

router.get("/movie/:id", (req, res) => {
  res.sendFile(Path.join(dirname, "../public/movie.html"));
});

router.get("/explore", (req, res) => {
  res.sendFile(Path.join(dirname, "../public/explore.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(Path.join(dirname, "../public/login.html"));
});

router.get("/signup", (req, res) => {
  res.sendFile(Path.join(dirname, "../public/signup.html"));
});

router.post(
  "/signup",
  [
    body("username")
      .notEmpty()
      .withMessage("Username is required")
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters long")
      .custom(async (value) => {
        const user = await User.findOne({ username: value });
        if (user) return Promise.reject("username already used");
      }),
    body("password")
      .notEmpty()
      .withMessage("Password is required")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    // console.log("req.body", req.body);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    // console.log("username", username, "password", password);

    try {
      const newUser = new User({
        username,
        password,
      });
      await newUser.save();

      // Generate JWT token
      const payload = { userId: newUser._id };
      const token = jwt.sign(payload, secret, { expiresIn: "48h" });

      res
        .cookie("token", token, {
          httpOnly: true,
          // secure: true,
          sameSite: "strict",
          maxAge: 48 * 60 * 60 * 1000, // 48 hours
        })
        .status(201)
        .json({ msg: "Signup successful!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ msg: "Server error" });
    }
  }
);

export default router;
