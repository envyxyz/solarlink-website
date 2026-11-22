"use client";

import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Field, Textarea } from "@/components/ui/Field";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { WhatsAppGlyph } from "@/components/ui/WhatsAppGlyph";
import { quote } from "@/content/quote";
import { BILL_MODES, cleanPhone, LIMITS, PHONE_RE, quoteMessage } from "@/lib/quote";
import { fill } from "@/lib/sizing";
import { waHref } from "@/lib/phone";

/** One outlet as the form needs it. `whatsapp` is null while the number is not shown (production, unconfirmed). */
export type QuoteOutlet = { slug: string; city: string; whatsapp: string | null };

type Errors = Partial<Record<"name" | "phone" | "bill", string>>;
type Done = { name: string; city: string; url: string | null; stored: boolean };

const TIMEOUT_MS = 8000;

/** A visible label above a segmented control (its legend is screen-reader only, so this copy is hidden from them). */
const Choice = ({ label, children }: { label: string; children: ReactNode }) => (
  <div className="flex flex-col gap-2">
    <span aria-hidden className="text-small text-tone-ink">
      {label}
    </span>
    {children}
  </div>
);

/**
 * Quote form: posts to the Worker (/api/quote), which stores the lead and returns the WhatsApp link. With no Worker
 * (static preview) or any failure other than a validation error, it opens WhatsApp directly with the same text.
 */
export function QuoteForm({ outlets }: { outlets: QuoteOutlet[] }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState(outlets[0]?.slug ?? "");
  const [property, setProperty] = useState<string>(quote.property.options[0].value);
  const [billMode, setBillMode] = useState<string>(BILL_MODES[0]);
  const [bill, setBill] = useState("");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState(""); // honeypot
  const [errors, setErrors] = useState<Errors>({});
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState<Done | null>(null);
  const shownAt = useRef(0);
  const form = useRef<HTMLFormElement>(null);
  const result = useRef<HTMLDivElement>(null);

  useEffect(() => {
    shownAt.current = performance.now();
  }, []);
  // Move focus to the confirmation so a screen reader or keyboard user lands on it.
  useEffect(() => {
    if (done) result.current?.focus();
  }, [done]);

  const outlet = outlets.find((o) => o.slug === city) ?? outlets[0];

  function fail(next: Errors, general = quote.errors.summary) {
    setErrors(next);
    setFormError(general);
    requestAnimationFrame(() => (Array.from(form.current?.elements ?? []).find((el) => el.getAttribute("aria-invalid")) as HTMLElement | undefined)?.focus());
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (sending || !outlet) return;
    const cleanName = name.trim();
    const billNumber = bill ? Number(bill) : undefined;
    const next: Errors = {};
    if (cleanName.length < 2) next.name = quote.errors.name;
    if (!PHONE_RE.test(cleanPhone(phone))) next.phone = quote.errors.phone;
    if (billNumber !== undefined && !(Number.isInteger(billNumber) && billNumber >= 1 && billNumber <= LIMITS.bill)) next.bill = quote.errors.bill;
    if (Object.keys(next).length) return fail(next);

    setErrors({});
    setFormError("");
    setSending(true);
    const fields = { name: cleanName, property, city: outlet.city, bill: billNumber, billMode: billNumber ? billMode : undefined, message: message.trim() || undefined };
    const text = quoteMessage(fields);
    let url = outlet.whatsapp ? waHref(outlet.whatsapp, text) : null;
    let stored = false;
    try {
      const res = await fetch("/api/quote", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ ...fields, city, phone, website, elapsed: Math.round(performance.now() - shownAt.current) }),
        signal: AbortSignal.timeout(TIMEOUT_MS),
      });
      const body = await res.json().catch(() => null);
      if (res.ok) {
        // The Worker builds the link from the number it may show; trust it, including a null.
        url = body?.whatsapp ?? null;
        stored = body?.stored === true;
      } else if (res.status === 400 && Array.isArray(body?.fields) && body.fields.length) {
        const known = body.fields.filter((f: string) => f === "name" || f === "phone" || f === "bill");
        setSending(false);
        return fail(Object.fromEntries(known.map((f: "name" | "phone" | "bill") => [f, quote.errors[f]])), known.length ? quote.errors.summary : quote.errors.send);
      }
      // Any other answer (404 in a static preview, 429, 5xx): keep the direct link built above.
    } catch {
      // Offline or no Worker: same direct link.
    }
    setSending(false);
    setDone({ name: cleanName, city: outlet.city, url, stored });
    if (url) window.location.assign(url);
  }

  if (done) {
    const vars = { name: done.name, city: done.city };
    return (
      <div ref={result} tabIndex={-1} role="status" className="flex flex-col items-start gap-4 text-tone-ink outline-none">
        <h3 className="text-h3">{fill(quote.done.heading, vars)}</h3>
        <p className="text-body">{fill(done.url ? quote.done.opening : done.stored ? quote.done.saved : quote.done.noNumber, vars)}</p>
        {done.url && (
          <Button href={done.url} variant="dark">
            <WhatsAppGlyph />
            {quote.done.link}
          </Button>
        )}
      </div>
    );
  }

  return (
    <form ref={form} onSubmit={onSubmit} noValidate className="flex flex-col gap-6">
      <Field label={quote.name.label} name="name" autoComplete={quote.name.autoComplete} required maxLength={LIMITS.name} value={name} onChange={(e) => setName(e.target.value)} error={errors.name} />
      <Field
        label={quote.phone.label}
        hint={quote.phone.hint}
        name="phone"
        type="tel"
        inputMode="tel"
        autoComplete={quote.phone.autoComplete}
        required
        maxLength={LIMITS.phone}
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        error={errors.phone}
      />
      {outlets.length > 1 && (
        <Choice label={quote.city.label}>
          <SegmentedControl label={quote.city.label} options={outlets.map((o) => ({ value: o.slug, label: o.city }))} value={city} onValueChange={setCity} />
        </Choice>
      )}
      <Choice label={quote.property.label}>
        <SegmentedControl label={quote.property.label} options={quote.property.options} value={property} onValueChange={setProperty} />
      </Choice>
      <div className="flex flex-col gap-3">
        <Choice label={quote.bill.label}>
          <SegmentedControl label={quote.bill.label} options={[...quote.bill.modes]} value={billMode} onValueChange={setBillMode} />
        </Choice>
        <Field
          label={quote.bill.amount[billMode as "rs" | "units"]}
          hint={quote.bill.hint}
          name="bill"
          inputMode="numeric"
          autoComplete="off"
          maxLength={String(LIMITS.bill).length}
          value={bill}
          onChange={(e) => setBill(e.target.value.replace(/\D/g, ""))}
          error={errors.bill}
        />
      </div>
      <Textarea label={quote.message.label} name="message" rows={3} maxLength={LIMITS.message} value={message} onChange={(e) => setMessage(e.target.value)} />

      {/* Honeypot: out of sight, out of the tab order and the accessibility tree. */}
      <div aria-hidden inert className="sr-only">
        <input type="text" name="website" tabIndex={-1} autoComplete="off" value={website} onChange={(e) => setWebsite(e.target.value)} />
      </div>

      <p role="alert" className="text-small text-error empty:hidden">
        {formError}
      </p>
      <div className="flex flex-col items-start gap-3">
        <Button type="submit" size="lg" loading={sending}>
          <WhatsAppGlyph />
          {quote.submit}
        </Button>
        <p className="text-small text-tone-ink-2">
          {quote.privacy.text}{" "}
          <Link href={quote.privacy.href} className="focus-ring hit-area rounded-input underline">
            {quote.privacy.link}
          </Link>
        </p>
      </div>
    </form>
  );
}
