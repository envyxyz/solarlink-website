"use client";

import { useId, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from "react";
import { AlertCircle, ChevronDown, Loader2 } from "lucide-react";
import { ui } from "@/content/ui";
import { cn } from "@/lib/cn";
import { icon } from "./icons";

/** Sunken well, input radius. Hover and active step the tone; focus shows the ring; error adds an outline and a message. */
const well =
  "focus-ring w-full rounded-input bg-tone-sunken px-4 text-body text-tone-ink placeholder:text-tone-ink-2 hover:brightness-95 disabled:opacity-50 aria-invalid:outline aria-invalid:outline-2 aria-invalid:outline-error";

type Shared = { label: string; error?: string; hint?: string; loading?: boolean };

function Shell({ id, label, error, hint, loading, children }: Shared & { id: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-small text-tone-ink">
        {label}
      </label>
      <div className="relative">
        {children}
        {loading && <Loader2 {...icon} aria-label={ui.loading} aria-hidden={false} className="absolute right-4 top-4 animate-spin text-tone-ink-2" />}
      </div>
      {hint && !error && (
        <p id={`${id}-hint`} className="text-caption text-tone-ink-2">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="flex items-start gap-2 text-caption text-error">
          <AlertCircle {...icon} size={16} className="mt-px shrink-0" />
          {error}
        </p>
      )}
    </div>
  );
}

const describedBy = (id: string, s: Shared) => (s.error ? `${id}-error` : s.hint ? `${id}-hint` : undefined);

type InputProps = Shared & Omit<InputHTMLAttributes<HTMLInputElement>, "className">;
/** Text input with a visible label above and error text below. */
export function Field({ label, error, hint, loading, id: idProp, ...rest }: InputProps) {
  const auto = useId();
  const id = idProp ?? auto;
  return (
    <Shell id={id} {...{ label, error, hint, loading }}>
      <input id={id} aria-invalid={!!error || undefined} aria-describedby={describedBy(id, { label, error, hint })} aria-busy={loading || undefined} className={cn(well, "h-control-lg")} {...rest} />
    </Shell>
  );
}

type TextareaProps = Shared & Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "className">;
export function Textarea({ label, error, hint, loading, id: idProp, rows = 4, ...rest }: TextareaProps) {
  const auto = useId();
  const id = idProp ?? auto;
  return (
    <Shell id={id} {...{ label, error, hint, loading }}>
      <textarea id={id} rows={rows} aria-invalid={!!error || undefined} aria-describedby={describedBy(id, { label, error, hint })} aria-busy={loading || undefined} className={cn(well, "min-h-control-lg resize-y py-4")} {...rest} />
    </Shell>
  );
}

type SelectProps = Shared & Omit<SelectHTMLAttributes<HTMLSelectElement>, "className"> & { options: { value: string; label: string }[]; placeholder?: string };
/** Native select (the platform picker is the best control on a phone), styled as a well. */
export function Select({ label, error, hint, loading, id: idProp, options, placeholder, ...rest }: SelectProps) {
  const auto = useId();
  const id = idProp ?? auto;
  return (
    <Shell id={id} {...{ label, error, hint, loading }}>
      <select id={id} aria-invalid={!!error || undefined} aria-describedby={describedBy(id, { label, error, hint })} aria-busy={loading || undefined} className={cn(well, "h-control-lg appearance-none pr-12")} {...rest}>
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
      {!loading && <ChevronDown {...icon} className="pointer-events-none absolute right-4 top-4 text-tone-ink-2" />}
    </Shell>
  );
}
