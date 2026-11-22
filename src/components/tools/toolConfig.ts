import { sizingConfig } from "@/components/home/sizingConfig";
import type { SizingConfig } from "@/components/home/SizingProvider";
import { outlets } from "@/content";
import { toolsContent } from "@/content/tools";
import { show } from "@/lib/facts";
import type { HandoffOutlet } from "@/lib/tools/handoff";
import type { StateConfig } from "@/lib/tools/state";

export type ToolConfig = { state: StateConfig; sizing: SizingConfig; outlets: HandoffOutlet[] };

/**
 * Everything a tool island needs from the server: starting values, the sizing constants and each outlet's WhatsApp
 * number (null in production until the client confirms it, then the tools hand off to the quote page).
 */
export function toolConfig(): ToolConfig {
  const sizing = sizingConfig();
  const t = toolsContent;
  return {
    sizing,
    outlets: outlets.map((o) => ({ slug: o.slug, city: o.city, whatsapp: show(o.whatsapp) })),
    state: {
      appliances: t.appliances.map(({ id, watts, day, night }) => ({ id, watts, day, night })),
      rs: sizing.rs,
      units: { ...sizing.units },
      cities: outlets.map((o) => o.slug),
      battery: t.batteryDefaults,
      maxHours: t.maxHours,
    },
  };
}
