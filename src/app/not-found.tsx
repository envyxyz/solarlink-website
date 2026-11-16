import { seo, ui } from "@/content";
import { Button } from "@/components/ui/Button";
import { buildMetadata } from "@/lib/seo";

export const metadata = buildMetadata("notFound");

export default function NotFound() {
  return (
    <main id="main" className="mx-auto w-full max-w-page px-gutter py-section">
      <h1 className="text-h2">{seo.notFound.h1}</h1>
      <p className="mt-6 max-w-prose text-lead text-ink-2">{ui.notFound.body}</p>
      <div className="mt-10">
        <Button href="/" size="lg">
          {ui.notFound.home}
        </Button>
      </div>
    </main>
  );
}
