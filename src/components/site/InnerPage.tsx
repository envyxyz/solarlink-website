import { JsonLd } from "@/components/JsonLd";
import { Block, slug, type Ground } from "@/components/pages/Block";
import { PageHero } from "@/components/pages/PageHero";
import { QuoteDock } from "@/components/pages/QuoteDock";
import { Button } from "@/components/ui/Button";
import { ClosingCall } from "@/components/home/ClosingCall";
import { nav, ui } from "@/content";
import type { PageBlock, PageDoc } from "@/content/pages";
import { docLd, faqLd } from "@/lib/jsonld";
import { outletWhatsApp } from "@/lib/links";

const MAX_NIGHT = 2;

/** Each block's ground from its type; a third night stage falls back to sunken. Reading pages keep to plain and sunken. */
function groundsFor(blocks: PageBlock[], reading: boolean): { blocks: PageBlock[]; grounds: Ground[] } {
  let nights = 0;
  const night = () => !reading && nights++ < MAX_NIGHT;
  const out = blocks.map((b): [PageBlock, Ground] => {
    if (b.type === "steps" || b.type === "shop") return [b, night() ? "night" : "sunken"];
    if (b.type === "feature" && b.tone === "night") return night() ? [b, "night"] : [{ ...b, tone: "sunken" }, "sunken"];
    if (b.type === "diagram" || b.type === "sizing" || (b.type === "facts" && !reading)) return [b, "sunken"];
    return [b, "plain"];
  });
  return { blocks: out.map(([b]) => b), grounds: out.map(([, g]) => g) };
}

/**
 * Shared template for every inner page. Hero, the blocks on a rhythm of grounds, related links, the closing call and
 * the quote dock. Guides, articles and legal pages read as one narrow column with an "On this page" list from 64rem;
 * every other kind uses the full page width.
 */
export function InnerPage({ doc }: { doc: PageDoc }) {
  const reading = doc.kind === "guide" || doc.kind === "article" || doc.kind === "legal";
  // A feature never repeats the hero render: same image, statement only.
  const own = doc.blocks.map((b) => (b.type === "feature" && b.image && b.image.src === doc.image?.src ? { ...b, image: undefined } : b));
  const { blocks, grounds } = groundsFor(own, reading);
  const headings = doc.blocks.flatMap((b) => ("heading" in b && b.heading ? [b.heading] : []));
  const faq = doc.blocks.find((b): b is Extract<PageBlock, { type: "faq" }> => b.type === "faq");
  const wa = outletWhatsApp("lahore");

  const related = doc.related && doc.related.length > 0 && (
    <section className={reading ? undefined : "page-width"}>
      <div className={reading ? undefined : "grid gap-6 lg:grid-cols-12 lg:gap-10"}>
        <h2 className={reading ? "mb-4 text-h3" : "text-h3 lg:col-span-4"}>{ui.page.related}</h2>
        <ul className="-mx-2 flex flex-wrap lg:col-span-8">
          {doc.related.map((r) => (
            <li key={r.href}>
              <Button variant="text" href={r.href} className="px-2 pr-6">
                {r.label}
              </Button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );

  return (
    <main id="main">
      <PageHero doc={doc} />

      {reading ? (
        <div className="page-width mb-section mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {headings.length > 1 && (
            <nav aria-label={ui.page.onThisPage} className="hidden lg:sticky lg:top-28 lg:col-span-3 lg:block lg:self-start">
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
          <div className="flex flex-col gap-16 lg:col-span-7 lg:col-start-4">
            {blocks.map((b, i) => (
              <Block key={i} block={b} ground={grounds[i]} wide={false} />
            ))}
            {related}
          </div>
        </div>
      ) : (
        <div className="mb-section mt-16 flex flex-col gap-section lg:mt-24">
          {blocks.map((b, i) => (
            <Block key={i} block={b} ground={grounds[i]} wide featured={doc.kind === "hub"} />
          ))}
          {related}
        </div>
      )}

      <div data-dock-hide="">
        <ClosingCall />
      </div>
      <JsonLd data={[docLd(doc), faq ? faqLd(faq.items) : null]} />
      {doc.kind !== "legal" && <QuoteDock label={ui.page.dock} title={doc.h1} quote={{ label: ui.page.quote, href: nav.quote.href }} whatsapp={wa ? { label: ui.whatsapp.openLabel, href: wa } : null} />}
    </main>
  );
}
