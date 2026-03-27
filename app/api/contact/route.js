import nodemailer from "nodemailer";

const REQUIRED_FIELDS = ["name", "email", "message"];

function validatePayload(payload) {
  if (!payload || typeof payload !== "object") {
    return "Invalid request payload";
  }

  for (const field of REQUIRED_FIELDS) {
    if (!payload[field] || typeof payload[field] !== "string") {
      return `Missing required field: ${field}`;
    }
  }

  if (!payload.email.includes("@")) {
    return "Invalid email address";
  }

  if (payload.name.length > 120 || payload.email.length > 180 || payload.message.length > 4000) {
    return "Input is too long";
  }

  return null;
}

export async function POST(request) {
  try {
    const body = await request.json();
    const error = validatePayload(body);

    if (error) {
      return Response.json({ error }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = Number(process.env.SMTP_PORT || 465);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      return Response.json(
        { error: "Email service not configured on server" },
        { status: 500 }
      );
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || "achiramedagedara0@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || smtpUser;

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const safeName = body.name.trim();
    const safeEmail = body.email.trim();
    const safeMessage = body.message.trim();

    await transporter.sendMail({
      from: `Portfolio Contact <${fromEmail}>`,
      to: toEmail,
      replyTo: safeEmail,
      subject: `Portfolio Contact: ${safeName}`,
      text: [
        "New portfolio contact message",
        "",
        `Name: ${safeName}`,
        `Email: ${safeEmail}`,
        "",
        "Message:",
        safeMessage,
      ].join("\n"),
      html: `
        <h2>New portfolio contact message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;font-family:monospace">${safeMessage}</pre>
      `,
    });

    return Response.json({ ok: true });
  } catch (error) {
    if (error?.code === "EAUTH" || error?.responseCode === 535) {
      return Response.json(
        {
          error:
            "SMTP authentication failed. For Gmail, use a 16-character App Password (not your normal Gmail password).",
        },
        { status: 500 }
      );
    }

    if (error?.code === "ESOCKET" || error?.code === "ECONNECTION") {
      return Response.json(
        { error: "Could not connect to SMTP server. Check SMTP host, port, and network." },
        { status: 500 }
      );
    }

    return Response.json(
      { error: "Unexpected server error while sending email" },
      { status: 500 }
    );
  }
}
