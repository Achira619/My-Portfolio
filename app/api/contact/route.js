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

    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      return Response.json(
        { error: "Email service not configured on server" },
        { status: 500 }
      );
    }

    const toEmail = process.env.CONTACT_TO_EMAIL || process.env.MAIL_TO || "achiramedagedara0@gmail.com";
    const fromEmail = process.env.CONTACT_FROM_EMAIL || process.env.MAIL_FROM;

    if (!fromEmail) {
      return Response.json(
        { error: "Missing CONTACT_FROM_EMAIL in server environment" },
        { status: 500 }
      );
    }

    const safeName = body.name.trim();
    const safeEmail = body.email.trim();
    const safeMessage = body.message.trim();

    const resendPayload = {
      from: fromEmail,
      to: toEmail,
      replyTo: safeEmail,
      subject: `Portfolio Contact: ${safeName}`,
      html: `
        <h2>New portfolio contact message</h2>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <pre style="white-space:pre-wrap;font-family:monospace">${safeMessage}</pre>
      `,
      text: [
        "New portfolio contact message",
        "",
        `Name: ${safeName}`,
        `Email: ${safeEmail}`,
        "",
        "Message:",
        safeMessage,
      ].join("\n"),
    };

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(resendPayload),
    });

    const resendResponse = await response.json();

    if (!response.ok) {
      return Response.json(
        {
          error: `Resend error (${response.status})`,
          details: resendResponse,
        },
        { status: 500 }
      );
    }

    return Response.json({
      ok: true,
      provider: "resend",
      messageId: resendResponse?.id ?? null,
    });
  } catch (error) {
    if (error instanceof TypeError) {
      return Response.json(
        {
          error: "Could not reach Resend API. Check network access and endpoint configuration.",
        },
        { status: 500 }
      );
    }

    return Response.json(
      { error: "Unexpected server error while sending email" },
      { status: 500 }
    );
  }
}
