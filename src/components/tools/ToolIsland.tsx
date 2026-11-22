"use client";

import dynamic from "next/dynamic";
import type { ToolConfig } from "./toolConfig";

// Each tool is its own chunk, loaded only on its page: the home page JS does not grow. Server-rendered first, so the
// inputs and starting result are in the HTML before any script runs.
const tools = {
  load: dynamic(() => import("./LoadTool").then((m) => m.LoadTool)),
  battery: dynamic(() => import("./BatteryTool").then((m) => m.BatteryTool)),
  solar: dynamic(() => import("./SolarTool").then((m) => m.SolarTool)),
};

export function ToolIsland({ tool, config }: { tool: keyof typeof tools; config: ToolConfig }) {
  const Tool = tools[tool];
  return <Tool config={config} />;
}
