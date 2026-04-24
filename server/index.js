import "dotenv/config";
import cors from "cors";
import express from "express";
import { appendFile } from "node:fs/promises";
import nodemailer from "nodemailer";

const app = express();
const port = process.env.PORT || 4000;
const inquiryRecipient = process.env.INQUIRY_RECIPIENT || "tantiakash19@gmail.com";
const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = process.env.SMTP_SECURE === "true";
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;
const adminToken = process.env.ADMIN_TOKEN || "";

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

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/debug/mail", async (req, res) => {
  const providedToken = String(req.headers["x-admin-token"] || req.body?.token || "");
  if (!adminToken || providedToken !== adminToken) {
    return res.status(401).json({ ok: false, message: "Unauthorized" });
  }

  const transporter = createTransporter();
  if (!transporter) {
    return res.status(400).json({ ok: false, message: "SMTP is not configured." });
  }

  const sentAt = new Date().toISOString();
  try {
    await transporter.sendMail({
      from: smtpUser,
      to: inquiryRecipient,
      subject: "SMTP Debug Test Email",
      text: `SMTP debug email sent successfully at ${sentAt}.`,
    });
    return res.json({ ok: true, message: `Debug email sent to ${inquiryRecipient}.`, sentAt });
  } catch (error) {
    console.error("Debug email send failed:", error);
    return res.status(500).json({ ok: false, message: "Failed to send debug email." });
  }
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
      message: "Inquiry received successfully.",
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
    return res.status(200).json({ ok: true, message: "Inquiry received successfully." });
  }
});

app.listen(port, () => {
  console.log(`Inquiry API running at http://localhost:${port}`);
});
