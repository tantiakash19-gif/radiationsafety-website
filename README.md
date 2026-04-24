# radiationsafety-website

AERB Radiation Safety Consultancy website

## Inquiry Email Setup

To receive every inquiry on `tantiakash19@gmail.com`, run backend with SMTP env vars:

- `SMTP_HOST` (example: `smtp.gmail.com`)
- `SMTP_PORT` (example: `587`)
- `SMTP_SECURE` (`true` for 465, otherwise `false`)
- `SMTP_USER` (your sender Gmail address)
- `SMTP_PASS` (your Gmail App Password)
- `INQUIRY_RECIPIENT` (optional, defaults to `tantiakash19@gmail.com`)

PowerShell example:

`$env:SMTP_HOST="smtp.gmail.com"; $env:SMTP_PORT="587"; $env:SMTP_SECURE="false"; $env:SMTP_USER="yourgmail@gmail.com"; $env:SMTP_PASS="your_app_password"; npm run server`
