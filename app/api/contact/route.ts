import { NextResponse } from "next/server";
import { Resend } from "resend";

// ─────────────────────────────────────────────────────────────────────────────
// CONTACT API ROUTE
//
// Receives the form POST, validates it, and emails you via Resend. The API key
// is read from the server environment and never exposed to the browser.
//
// Setup:
//   1. Sign up free at https://resend.com and create an API key.
//   2. Add RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL to .env.local
//      (and to your Vercel project's Environment Variables for production).
// ─────────────────────────────────────────────────────────────────────────────

interface ContactPayload {
  name?: string;
  email?: string;
  message?: string;
}

const isEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export async function POST(request: Request) {
  let data: ContactPayload;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = data.name?.trim() ?? "";
  const email = data.email?.trim() ?? "";
  const message = data.message?.trim() ?? "";

  // Validation
  if (!name || !email || !message) {
    return NextResponse.json(
      { error: "Please fill in every field." },
      { status: 400 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { error: "That email address doesn't look right." },
      { status: 400 },
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { error: "That message is a little too long." },
      { status: 400 },
    );
  }

  // Make sure the server is configured before trying to send.
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    console.error(
      "Contact form is not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL.",
    );
    return NextResponse.json(
      { error: "The contact form isn't set up yet. Email me directly." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);

  try {
    const { error } = await resend.emails.send({
      from: `Portfolio <${from}>`,
      to: [to],
      replyTo: email, // hitting "reply" responds to the sender
      subject: `New message from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: "Couldn't send the message. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Unexpected error sending email:", err);
    return NextResponse.json(
      { error: "Couldn't send the message. Please try again." },
      { status: 500 },
    );
  }
}
