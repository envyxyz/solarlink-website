import type { CSSProperties } from "react";
import { footer, outlets, outletsSection as section, awaiting } from "@/content";
import { Button } from "@/components/ui/Button";
import { Card, CardBody } from "@/components/ui/Card";
import { Chip } from "@/components/ui/Chip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { preview, show } from "@/lib/facts";
import { mapsHref, outletWhatsApp, telHref } from "@/lib/links";

/**
 * Heading, then one card per shop. The confirmed address always shows; phones, WhatsApp and hours show field by field
 * once confirmed (dev builds show them all, with an "Awaiting client" chip on a card that has unconfirmed fields).
 */
export function Outlets() {
  const reachable = outlets.some((o) => show(o.phones) || show(o.whatsapp));
  return (
    <section id="outlets" className="page-width mb-section flex flex-col gap-12">
      <div data-reveal="">
        <SectionHeading title={section.title} lead={reachable ? section.lead : section.leadWalkIn} />
      </div>
      <ul className="grid gap-4 lg:grid-cols-3">
        {outlets.map((o, i) => {
          const address = show(o.addressLines);
          const phones = show(o.phones);
          const whatsapp = outletWhatsApp(o.slug, section.whatsappText);
          const hours = show(o.hours);
          const pending = preview && [o.phones, o.whatsapp, o.hours].some((f) => !f.confirmed);
          return (
            <li key={o.slug} data-reveal="" style={{ "--i": i + 1 } as CSSProperties}>
              <Card className="@container h-full">
                <CardBody className="h-full gap-5 p-5">
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                    <h3 className="text-h3">{o.city}</h3>
                    {o.role === "head-office" && <Chip>{footer.headOffice}</Chip>}
                    {pending && <Chip>{awaiting}</Chip>}
                  </div>
                  <div className="flex flex-col gap-3 text-body">
                    {address && <p className="text-tone-ink-2">{address.slice(0, -1).join(", ")}</p>}
                    {phones && (
                      <p className="flex flex-col">
                        {phones.map((p) => (
                          <a key={p} href={telHref(p)} className="focus-ring tabular inline-flex min-h-control items-center self-start rounded-pill underline-offset-4 hover:underline focus-visible:underline">
                            {p}
                          </a>
                        ))}
                      </p>
                    )}
                    {hours && <p className="text-small text-tone-ink-2">{hours}</p>}
                  </div>
                  <div className="mt-auto grid grid-cols-2 gap-2 @xl:grid-cols-3">
                    {address && (
                      <Button variant="dark" href={mapsHref(address)} ev={["directions_click", { outlet: o.slug }]} className="col-span-2 @xl:col-span-1">
                        {section.directions}
                      </Button>
                    )}
                    {phones && (
                      <Button variant="quiet" href={telHref(phones[0])} ev={["call_click", { outlet: o.slug, place: "card" }]} className="whitespace-normal! py-2 px-3! text-center leading-tight!">
                        {section.call}
                      </Button>
                    )}
                    {whatsapp && (
                      <Button variant="quiet" href={whatsapp} ev={["whatsapp_click", { outlet: o.slug, place: "card" }]} className="whitespace-normal! py-2 px-3! text-center leading-tight!">
                        <WhatsAppGlyph />
                        {section.message}
                      </Button>
                    )}
                  </div>
                </CardBody>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
