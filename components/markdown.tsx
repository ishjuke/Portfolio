import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import Link from "next/link";

// Renders Markdown into styled elements matching the field-notes aesthetic.
// Each element type is mapped to Tailwind classes so posts look consistent
// with the rest of the site without needing a typography plugin.
export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: (props) => (
          <h1
            className="mt-10 font-display text-3xl font-semibold tracking-tight"
            {...props}
          />
        ),
        h2: (props) => (
          <h2
            className="mt-10 font-display text-2xl font-semibold tracking-tight"
            {...props}
          />
        ),
        h3: (props) => (
          <h3
            className="mt-8 font-display text-xl font-semibold tracking-tight"
            {...props}
          />
        ),
        p: (props) => <p className="mt-5 leading-relaxed" {...props} />,
        ul: (props) => (
          <ul className="mt-5 flex list-disc flex-col gap-2 pl-6" {...props} />
        ),
        ol: (props) => (
          <ol
            className="mt-5 flex list-decimal flex-col gap-2 pl-6"
            {...props}
          />
        ),
        li: (props) => <li className="leading-relaxed" {...props} />,
        blockquote: (props) => (
          <blockquote
            className="mt-5 border-l-2 border-accent pl-4 italic text-muted-foreground"
            {...props}
          />
        ),
        a: ({ href, ...props }) => {
          const url = href ?? "#";
          const isInternal = url.startsWith("/");
          const className =
            "text-accent underline-offset-4 hover:underline";
          return isInternal ? (
            <Link href={url} className={className} {...props} />
          ) : (
            <a
              href={url}
              target="_blank"
              rel="noreferrer"
              className={className}
              {...props}
            />
          );
        },
        code: (props) => (
          <code
            className="rounded bg-muted px-1.5 py-0.5 font-mono text-[0.85em]"
            {...props}
          />
        ),
        pre: (props) => (
          <pre
            className="mt-5 overflow-x-auto rounded-lg border border-border bg-card p-4 font-mono text-sm [&_code]:bg-transparent [&_code]:p-0"
            {...props}
          />
        ),
        hr: () => <hr className="mt-8 border-border" />,
      }}
    >
      {children}
    </ReactMarkdown>
  );
}
