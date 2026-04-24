import "dotenv/config";
import cors from "cors";
import express from "express";
import { appendFile, readFile } from "node:fs/promises";
import nodemailer from "nodemailer";

const app = express();
const port = process.env.PORT || 4000;
const inquiryRecipient = process.env.INQUIRY_RECIPIENT || "tantiakash19@gmail.com";
const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = process.env.SMTP_SECURE === "true";
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const adminToken = process.env.ADMIN_TOKEN || "change-me-admin-token";

app.use(cors());
app.use(express.json());

function createTransporter() {
  if (!smtpHost || !smtpUser || !smtpPass) return null;
  return nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpSecure,
    auth: { user: smtpUser, pass: smtpPass },
  });
}

async function saveInquiry(inquiry) {
  await appendFile("server/inquiries.ndjson", `${JSON.stringify(inquiry)}\n`, "utf8");
}

async function readSavedInquiries() {
  try {
    const raw = await readFile("server/inquiries.ndjson", "utf8");
    return raw
      .split("\n")
      .filter(Boolean)
      .map((line) => {
        try {
          return JSON.parse(line);
        } catch {
          return null;
        }
      })
      .filter(Boolean)
      .reverse();
  } catch {
    return [];
  }
}

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/admin/inquiries", async (req, res) => {
  const token = req.headers["x-admin-token"] || req.query.token;
  if (!token || token !== adminToken) {
    return res.status(401).json({ ok: false, message: "Unauthorized" });
  }

  const inquiries = await readSavedInquiries();
  return res.json({ ok: true, count: inquiries.length, inquiries });
});

app.post("/api/inquiry", async (req, res) => {
  const { name, phone, email, message } = req.body || {};

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ ok: false, message: "Missing required fields" });
  }

  const submittedAt = new Date().toISOString();
  const inquiry = { name, phone, email, message, submittedAt };
  console.log("New inquiry:", inquiry);

  try {
    await saveInquiry(inquiry);
  } catch (error) {
    console.error("Failed to persist inquiry:", error);
  }

  const transporter = createTransporter();
  if (!transporter) {
    return res.status(200).json({
      ok: true,
      message: "Inquiry received. Email is not configured yet, but inquiry was saved on server.",
    });
  }

  try {
    await transporter.sendMail({
      from: smtpUser,
      to: inquiryRecipient,
      replyTo: email,
      subject: `New Inquiry from ${name}`,
      text: `New inquiry received.\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}\nSubmitted At: ${submittedAt}\n\nMessage:\n${message}`,
    });
    return res.json({ ok: true, message: "Inquiry received and emailed." });
  } catch (error) {
    console.error("Failed to send inquiry email:", error);
    return res.status(200).json({ ok: true, message: "Inquiry received. Email send failed, but inquiry was saved." });
  }
});

app.listen(port, () => {
  console.log(`Inquiry API running at http://localhost:${port}`);
});
