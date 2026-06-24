import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-5xl flex-col items-start px-6 py-32">
      <p className="eyebrow mb-4">Error 404</p>
      <h1 className="font-display text-4xl font-semibold tracking-tight sm:text-5xl">
        This page isn&apos;t in the log.
      </h1>
      <p className="mt-4 text-muted-foreground">
        The thing you&apos;re looking for moved, or never existed.
      </p>
      <Link
        href="/"
        className="mt-8 text-sm font-medium text-accent underline-offset-4 hover:underline"
      >
        ← Back home
      </Link>
    </section>
  );
}
