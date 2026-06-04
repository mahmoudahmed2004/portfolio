import type { MDXComponents } from "mdx/types";
import { compileMDX } from "next-mdx-remote/rsc";
import { cn } from "@/lib/utils";

const components: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-8 text-2xl font-semibold tracking-normal text-[var(--text-strong)]"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-6 text-lg font-semibold tracking-normal text-[var(--text-strong)]"
      {...props}
    />
  ),
  p: (props) => <p className="leading-8 text-[var(--text-soft)]" {...props} />,
  ul: (props) => (
    <ul
      className="my-4 grid gap-2 text-[var(--text-soft)] marker:text-[var(--accent)]"
      {...props}
    />
  ),
  li: (props) => <li className="ml-5 list-disc leading-7" {...props} />,
  a: (props) => (
    <a
      className="font-medium text-[var(--accent-strong)] underline decoration-[var(--accent)]/40 underline-offset-4 transition hover:decoration-[var(--accent)]"
      target="_blank"
      rel="noreferrer"
      {...props}
    />
  ),
};

export async function MdxContent({
  source,
  className,
}: {
  source: string;
  className?: string;
}) {
  const { content } = await compileMDX({
    source,
    components,
    options: { parseFrontmatter: false },
  });

  return <div className={cn("space-y-4", className)}>{content}</div>;
}
