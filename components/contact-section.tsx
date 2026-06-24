"use client";

import { useState, type FormEvent } from "react";
import { site } from "@/config/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Status = "idle" | "sending" | "sent" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string>("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setError("");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement)
        .value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || "Something went wrong. Please try again.");
      }

      form.reset();
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setError(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-16 sm:py-20">
      <div className="mb-8 flex items-baseline gap-3">
        <h2 className="eyebrow">Contact</h2>
        <span className="h-px flex-1 bg-border" aria-hidden />
      </div>

      <div className="grid gap-10 sm:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="font-display text-2xl leading-snug tracking-tight">
            Building something, or just want to say hi?
          </p>
          <p className="mt-4 text-muted-foreground">
            Drop a note and it lands straight in my inbox. Or email me directly
            at{" "}
            <a
              href={`mailto:${site.email}`}
              className="text-accent underline-offset-4 hover:underline"
            >
              {site.email}
            </a>
            .
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5">
              <label htmlFor="name" className="eyebrow">
                Name
              </label>
              <Input id="name" name="name" required autoComplete="name" />
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="eyebrow">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="message" className="eyebrow">
              Message
            </label>
            <Textarea id="message" name="message" required />
          </div>

          <div className="flex items-center gap-4">
            <Button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"}
            </Button>

            {status === "sent" && (
              <p className="text-sm text-accent" role="status">
                Thanks — message sent.
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-500" role="alert">
                {error}
              </p>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
