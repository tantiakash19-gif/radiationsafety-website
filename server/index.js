import cors from "cors";
import express from "express";

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/inquiry", (req, res) => {
  const { name, phone, email, message } = req.body || {};

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ ok: false, message: "Missing required fields" });
  }

  console.log("New inquiry:", { name, phone, email, message, submittedAt: new Date().toISOString() });
  return res.json({ ok: true, message: "Inquiry received" });
});

app.listen(port, () => {
  console.log(`Inquiry API running at http://localhost:${port}`);
});
