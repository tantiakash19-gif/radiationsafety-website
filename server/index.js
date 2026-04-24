import cors from "cors";
import express from "express";
import nodemailer from "nodemailer";

const app = express();
const port = process.env.PORT || 4000;
const inquiryRecipient = process.env.INQUIRY_RECIPIENT || "tantiakash19@gmail.com";
const smtpHost = process.env.SMTP_HOST;
const smtpPort = Number(process.env.SMTP_PORT || 587);
const smtpSecure = process.env.SMTP_SECURE === "true";
const smtpUser = process.env.SMTP_USER;
const smtpPass = process.env.SMTP_PASS;

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

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.post("/api/inquiry", async (req, res) => {
  const { name, phone, email, message } = req.body || {};

  if (!name || !phone || !email || !message) {
    return res.status(400).json({ ok: false, message: "Missing required fields" });
  }

  const submittedAt = new Date().toISOString();
  console.log("New inquiry:", { name, phone, email, message, submittedAt });

  const transporter = createTransporter();
  if (!transporter) {
    return res.status(500).json({
      ok: false,
      message: "Email is not configured on server. Set SMTP_HOST, SMTP_USER and SMTP_PASS.",
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
    return res.status(500).json({ ok: false, message: "Inquiry saved, but failed to send email." });
  }
});

app.listen(port, () => {
  console.log(`Inquiry API running at http://localhost:${port}`);
});
