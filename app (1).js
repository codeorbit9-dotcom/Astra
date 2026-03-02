import express from "express";
import multer from "multer";
import { spawn } from "child_process";
import path from "path";
import fs from "fs";

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());

app.get("/", (req, res) => {
  res.json({ status: "AI Guardian running" });
});

// STT Endpoint
app.post("/stt", upload.single("audio"), async (req, res) => {
  const filePath = req.file.path;

  const python = spawn("python3", ["stt.py", filePath]);

  let result = "";
  python.stdout.on("data", (data) => {
    result += data.toString();
  });

  python.on("close", () => {
    fs.unlinkSync(filePath);
    res.json({ text: result });
  });
});

// Classifier Endpoint
app.post("/classify", async (req, res) => {
  const python = spawn("python3", ["classify.py", req.body.text]);

  let result = "";
  python.stdout.on("data", (data) => {
    result += data.toString();
  });

  python.on("close", () => {
    res.json({ prediction: result.trim() });
  });
});

// TTS Endpoint
app.post("/tts", async (req, res) => {
  const python = spawn("python3", ["tts.py", req.body.text]);

  let result = "";
  python.stdout.on("data", (data) => {
    result += data.toString();
  });

  python.on("close", () => {
    res.json({ audio_path: result.trim() });
  });
});

app.listen(7860, () => console.log("Server running"));