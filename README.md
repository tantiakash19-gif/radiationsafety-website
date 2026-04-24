# radiationsafety-website

AERB Radiation Safety Consultancy website

## Inquiry Email Setup

To receive every inquiry on `tantiakash19@gmail.com`, configure SMTP in a local `.env` file:

1. Copy `.env.example` to `.env`
2. Fill your real SMTP sender credentials (`SMTP_USER`, `SMTP_PASS`)
3. Run `npm run server`

The backend now auto-loads `.env` using `dotenv`.

Required vars:

- `SMTP_HOST` (example: `smtp.gmail.com`)
- `SMTP_PORT` (example: `587`)
- `SMTP_SECURE` (`true` for 465, otherwise `false`)
- `SMTP_USER` (your sender Gmail address)
- `SMTP_PASS` (your Gmail App Password)
- `INQUIRY_RECIPIENT` (optional, defaults to `tantiakash19@gmail.com`)

If SMTP is not configured, inquiries are still accepted and stored in `server/inquiries.ndjson` so you do not lose leads.
