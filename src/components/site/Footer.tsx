import Link from "next/link";
import { business, footer, outlets } from "@/content";
import { show } from "@/lib/facts";
import { telHref } from "@/lib/links";
import { fill } from "@/lib/sizing";

const linkClass = "focus-ring dur-fast rounded-pill transition-colors hover:text-lime";
const numberClass = `${linkClass} tabular underline-offset-4 hover:underline focus-visible:underline`;

/**
 * Full-bleed night band as the page's footer landmark: square corners, flush with the viewport sides and the page
 * bottom. Its content sits in the page-width column so it lines up with the stages above: shops (address, phone and
 * hours only once the client confirms them), the link columns from docs/COPY-HOME.md section 12, socials once
 * confirmed, the legal line, and a giant faded wordmark (a pseudo-element, so it is not text for assistive tech)
 * sized from that column; its padding keeps the glyph overhang inside the band, so the wordmark is whole.
 */
export function Footer() {
  const name = show(business.name) as string;
  const socials = business.socials.map((s) => show(s)).filter((s) => s !== null);
  const legalName = show(business.legalName);
  const ntn = show(business.ntn);
  const legalLine = legalName && ntn ? fill(footer.legalLine, { brand: name, legal: legalName, ntn }) : footer.copyright;
  return (
    <footer className="night relative isolate overflow-hidden bg-night pt-10 lg:pt-14">
      <div className="page-width @container">
        <div>
          <h2 className="mb-6 text-title">{footer.outletsTitle}</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {outlets.map((o) => {
              const address = show(o.addressLines);
              const phones = show(o.phones);
              const hours = show(o.hours);
              return (
                <div key={o.slug} className="flex flex-col gap-2">
                  <Link href={o.path} className={`${linkClass} hit-area self-start text-h3`}>
                    {o.city}
                  </Link>
                  {o.role === "head-office" && <p className="text-caption text-night-ink-2">{footer.headOffice}</p>}
                  {address && <p className="text-small text-night-ink-2">{address.slice(0, -1).join(", ")}</p>}
                  {phones && (
                    <p className="flex flex-col gap-1 text-small">
                      {phones.map((p) => (
                        <a key={p} href={telHref(p)} className={`${numberClass} hit-area self-start`}>
                          {p}
                        </a>
                      ))}
                    </p>
                  )}
                  {hours && <p className="text-small text-night-ink-2">{hours}</p>}
                </div>
              );
            })}
          </div>

          <div className={`mt-12 grid grid-cols-2 gap-10 border-t border-night-line pt-12 ${socials.length ? "md:grid-cols-4" : "md:grid-cols-3"}`}>
            {footer.columns.map((col) => (
              <nav key={col.title} aria-labelledby={`footer-${col.title}`}>
                <h2 id={`footer-${col.title}`} className="text-title">
                  {col.title}
                </h2>
                <ul className="mt-4 flex flex-col gap-1 text-small text-night-ink-2">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className={`${linkClass} inline-flex min-h-control items-center`}>
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
            {socials.length > 0 && (
              <div>
                <h2 className="text-title">{footer.socialsTitle}</h2>
                <ul className="mt-4 flex flex-col gap-1 text-small text-night-ink-2">
                  {socials.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} rel="noopener noreferrer" className={`${linkClass} inline-flex min-h-control items-center`}>
                        {s.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-night-line pt-6 text-caption text-night-ink-2 md:flex-row md:items-center md:justify-between">
            <p>{legalLine}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {footer.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={`${linkClass} inline-flex min-h-control items-center`}>
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div aria-hidden data-text={name} className="wordmark pointer-events-none mt-6 pb-6 select-none whitespace-nowrap text-center text-giant text-night-ink/10" />
      </div>
    </footer>
  );
}
