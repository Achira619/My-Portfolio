import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { POST } from "../app/api/contact/route";

const ENV_KEYS = [
  "RESEND_API_KEY",
  "CONTACT_FROM_EMAIL",
  "CONTACT_TO_EMAIL",
  "MAIL_FROM",
  "MAIL_TO",
];

function createJsonRequest(body) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  const originalEnv = {};

  beforeEach(() => {
    for (const key of ENV_KEYS) {
      originalEnv[key] = process.env[key];
      delete process.env[key];
    }
  });

  afterEach(() => {
    for (const key of ENV_KEYS) {
      if (originalEnv[key] === undefined) {
        delete process.env[key];
      } else {
        process.env[key] = originalEnv[key];
      }
    }

    vi.restoreAllMocks();
  });

  it("rejects requests with missing required fields", async () => {
    const response = await POST(
      createJsonRequest({
        name: "Achira",
        email: "achira@example.com",
      })
    );

    await expect(response.json()).resolves.toEqual({
      error: "Missing required field: message",
    });
    expect(response.status).toBe(400);
  });

  it("rejects valid messages when email delivery is not configured", async () => {
    const fetchMock = vi.spyOn(globalThis, "fetch");

    const response = await POST(
      createJsonRequest({
        name: "Achira",
        email: "achira@example.com",
        message: "Hello from the portfolio.",
      })
    );

    await expect(response.json()).resolves.toEqual({
      error: "Email service not configured on server",
    });
    expect(response.status).toBe(500);
    expect(fetchMock).not.toHaveBeenCalled();
  });

  it("sends a valid contact message through Resend", async () => {
    process.env.RESEND_API_KEY = "resend_test_key";
    process.env.CONTACT_FROM_EMAIL = "portfolio@example.com";
    process.env.CONTACT_TO_EMAIL = "owner@example.com";

    const fetchMock = vi
      .spyOn(globalThis, "fetch")
      .mockResolvedValue(Response.json({ id: "email_123" }));

    const response = await POST(
      createJsonRequest({
        name: " Achira ",
        email: " achira@example.com ",
        message: " Hello from the portfolio. ",
      })
    );

    await expect(response.json()).resolves.toEqual({
      ok: true,
      provider: "resend",
      messageId: "email_123",
    });
    expect(response.status).toBe(200);
    expect(fetchMock).toHaveBeenCalledOnce();

    const [, options] = fetchMock.mock.calls[0];
    expect(options.headers.Authorization).toBe("Bearer resend_test_key");

    const resendPayload = JSON.parse(options.body);
    expect(resendPayload).toMatchObject({
      from: "portfolio@example.com",
      to: "owner@example.com",
      replyTo: "achira@example.com",
      subject: "Portfolio Contact: Achira",
    });
    expect(resendPayload.text).toContain("Hello from the portfolio.");
  });
});
