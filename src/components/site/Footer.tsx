import Link from "next/link";
import { business, footer, outlets } from "@/content";
import { Stage } from "@/components/ui/Stage";
import { show } from "@/lib/facts";
import { telHref } from "@/lib/links";

const linkClass = "focus-ring dur-fast rounded-pill transition-colors hover:text-lime";

/**
 * Night stage: shops (address, phone and hours only once the client confirms them), link columns for every
 * service, product, guide and company page, legal line, socials, and a giant faded wordmark that the
 * stage's bottom edge clips.
 */
export function Footer() {
  const name = show(business.name) as string;
  const socials = business.socials.map((s) => show(s)).filter((s) => s !== null);
  return (
    <div className="pb-gutter">
      <Stage as="footer" variant="night" className="@container pt-10 lg:pt-14">
        <div aria-label={footer.label} className="px-6 lg:px-14">
          <h2 className="sr-only">{footer.label}</h2>
          <div className="grid gap-10 md:grid-cols-3">
            {outlets.map((o) => {
              const address = show(o.addressLines);
              const phones = show(o.phones);
              const hours = show(o.hours);
              return (
                <div key={o.slug} className="flex flex-col gap-2">
                  <Link href={o.path} className={`${linkClass} self-start text-h3`}>
                    {o.city}
                  </Link>
                  {o.role === "head-office" && <p className="text-caption text-night-ink-2">{footer.headOffice}</p>}
                  {address && <p className="text-small text-night-ink-2">{address.slice(0, -1).join(", ")}</p>}
                  {phones && (
                    <p className="flex flex-col gap-1 text-small">
                      {phones.map((p) => (
                        <a key={p} href={telHref(p)} className={`${linkClass} self-start`}>
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

          <div className="mt-12 grid grid-cols-2 gap-10 border-t border-night-line pt-12 md:grid-cols-4">
            {footer.columns.map((col) => (
              <nav key={col.title} aria-label={col.title}>
                <h3 className="text-title">{col.title}</h3>
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
          </div>

          <div className="mt-12 flex flex-col gap-4 border-t border-night-line pt-6 text-caption text-night-ink-2 md:flex-row md:items-center md:justify-between">
            <p>{footer.legalLine}</p>
            <ul className="flex flex-wrap gap-x-6 gap-y-1">
              {footer.legal.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className={`${linkClass} inline-flex min-h-control items-center`}>
                    {l.label}
                  </Link>
                </li>
              ))}
              {socials.map((s) => (
                <li key={s.url}>
                  <a href={s.url} rel="noopener noreferrer" className={`${linkClass} inline-flex min-h-control items-center`}>
                    {s.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p aria-hidden className="pointer-events-none mt-6 translate-y-1/4 select-none whitespace-nowrap text-center text-giant text-night-ink/10">
          {name}
        </p>
      </Stage>
    </div>
  );
}
