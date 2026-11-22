
type Params = Record<string, string | boolean>;
export type Ev = [name: string, params: Params];

declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

/** gtag.js only understands Arguments objects in dataLayer, not arrays. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function gtag(..._args: unknown[]) {
  // eslint-disable-next-line prefer-rest-params
  (window.dataLayer ??= []).push(arguments);
}

/** Queue an event. Params are outlet slugs, places and flags only: never a name, phone, message or bill. No-op on the server. */
export function track(name: string, params: Params = {}) {
  if (typeof window !== "undefined") gtag("event", name, params);
}

const FIRST = ["pointerdown", "keydown", "scroll", "touchstart"] as const;

/** Inject gtag.js once, after the first interaction. Nothing loads before that, and nothing at all without a shown id. */
export function loadAnalytics(id: string | null) {
  if (!id) return;
  const start = () => {
    FIRST.forEach((t) => removeEventListener(t, start));
    gtag("js", new Date());
    gtag("config", id, { anonymize_ip: true, allow_google_signals: false, allow_ad_personalization_signals: false });
    const s = document.createElement("script");
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
    document.head.append(s);
  };
  FIRST.forEach((t) => addEventListener(t, start, { passive: true }));
}
