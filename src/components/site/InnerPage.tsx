import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { ClosingCall } from "@/components/home/ClosingCall";
import { awaiting, nav, ui } from "@/content";
import type { PageBlock, PageDoc } from "@/content/pages";
import { preview } from "@/lib/facts";
import { faqLd } from "@/lib/jsonld";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

/** Parent crumb from the path: the first segment's hub, or Resources for a top-level guide. */
function trailFor(doc: PageDoc): Crumb[] {
  const [first] = doc.path.split("/").filter(Boolean);
  const topLevel = doc.path.split("/").filter(Boolean).length === 1;
  const parentKey = topLevel ? (doc.kind === "guide" ? "resources" : null) : first;
  const parent = parentKey ? ui.page.parents[parentKey] : null;
  return [...(parent && parentKey ? ([[parent, `/${parentKey}/`]] as Crumb[]) : []), [doc.h1, doc.path]];
}

function Block({ block }: { block: PageBlock }) {
  const heading = "heading" in block && block.heading ? block.heading : null;
  return (
    <section id={heading ? slug(heading) : undefined} className="scroll-mt-26">
      {heading && <h2 className="mb-6 max-w-heading text-h3">{heading}</h2>}
      {block.type === "prose" && (
        <div className="flex max-w-prose flex-col gap-4 text-body">
          {block.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      )}
      {block.type === "facts" && (
        <dl className="grid gap-px overflow-hidden rounded-card bg-line sm:grid-cols-2">
          {block.items.map((f) => (
            <div key={f.label} className="flex flex-col gap-1 bg-surface p-5">
              <dt className="text-small text-ink-2">{f.label}</dt>
              <dd className="text-title">{f.value}</dd>
            </div>
          ))}
        </dl>
      )}
      {block.type === "steps" && (
        <ol className="grid gap-4 sm:grid-cols-2">
          {block.items.map((s) => (
            <li key={s.title}>
              <Card className="h-full">
                <div className="flex flex-col gap-2 p-5">
                  <h3 className="text-title">{s.title}</h3>
                  <p className="text-small text-tone-ink-2">{s.text}</p>
                </div>
              </Card>
            </li>
          ))}
        </ol>
      )}
      {block.type === "gallery" && (
        <ul className="grid gap-4 sm:grid-cols-2">
          {block.images.map((img) => (
            <li key={img.src} className="overflow-hidden rounded-card bg-sunken">
              <picture className="contents">
                <source type="image/avif" srcSet={img.src.replace(/\.webp$/, ".avif")} />
                <img src={img.src} alt={img.alt} width={img.width} height={img.height} loading="lazy" decoding="async" className="size-full object-cover" />
              </picture>
            </li>
          ))}
        </ul>
      )}
      {block.type === "faq" && <Accordion items={block.items} />}
    </section>
  );
}

/**
 * Shared template for services, systems, products, outlets, projects, guides and articles. Header (breadcrumbs, h1, lead),
 * the blocks, then related links and the closing call. Guides and articles read as one narrow column with an
 * "On this page" list; every other kind puts a quote card beside the blocks from 64rem.
 */
export function InnerPage({ doc }: { doc: PageDoc }) {
  const reading = doc.kind === "guide" || doc.kind === "article";
  const headings = doc.blocks.flatMap((b) => ("heading" in b && b.heading ? [b.heading] : []));
  const faq = doc.blocks.find((b): b is Extract<PageBlock, { type: "faq" }> => b.type === "faq");
  return (
    <main id="main">
      <header className="page-width flex flex-col items-start gap-6 pb-12 pt-32 lg:pb-16">
        <Breadcrumbs trail={trailFor(doc)} />
        {preview && !doc.confirmed && <Chip>{awaiting}</Chip>}
        <h1 className="max-w-3xl text-h2">{doc.h1}</h1>
        <p className="max-w-prose text-lead text-ink-2">{doc.lead}</p>
      </header>

      <div className="page-width mb-section grid gap-12 lg:grid-cols-3 lg:gap-16">
        {reading && headings.length > 1 && (
          <nav aria-label={ui.page.onThisPage} className="hidden lg:sticky lg:top-28 lg:block lg:self-start">
            <p className="text-small text-ink-2">{ui.page.onThisPage}</p>
            <ul className="mt-4 flex flex-col gap-1">
              {headings.map((h) => (
                <li key={h}>
                  <a href={`#${slug(h)}`} className="focus-ring hit-area block rounded-input py-1 text-small hover:underline">
                    {h}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
        <div className="flex flex-col gap-16 lg:col-span-2">
          {doc.blocks.map((b, i) => (
            <Block key={i} block={b} />
          ))}
          {doc.related && doc.related.length > 0 && (
            <section>
              <h2 className="mb-4 text-h3">{ui.page.related}</h2>
              <ul className="flex flex-col">
                {doc.related.map((r) => (
                  <li key={r.href} className="border-b border-line">
                    <Link href={r.href} className="focus-ring flex min-h-control-lg items-center text-title hover:text-ink-2">
                      {r.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </div>
        {!reading && (
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <Card ink>
              <div className="flex flex-col items-start gap-4 p-6">
                <h2 className="text-h3">{ui.page.askHeading}</h2>
                <Button href={nav.quote.href}>{ui.page.quote}</Button>
              </div>
            </Card>
          </aside>
        )}
      </div>
      <ClosingCall />
      {faq && <JsonLd data={faqLd(faq.items)} />}
    </main>
  );
}
