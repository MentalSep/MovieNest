import express from "express";
import Path from "path";
import { fileURLToPath } from "url";

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

export default router;
