"use client";

import { useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { IconButton } from "./Button";
import { icon } from "./icons";

/** Pause and play for the marquee just before it. It flips data-paused on the belt, which stops its animation (CSS). Ink fill: a sunken circle on the ground was too faint to find. Not needed under reduced motion, where the belt does not move. */
export function MarqueePause({ labels }: { labels: { pause: string; play: string } }) {
  const [paused, setPaused] = useState(false);
  const wrap = useRef<HTMLSpanElement>(null);
  const toggle = () => {
    const next = !paused;
    setPaused(next);
    wrap.current?.previousElementSibling?.toggleAttribute("data-paused", next);
  };
  return (
    <span ref={wrap} className="shrink-0 motion-reduce:hidden">
      <IconButton variant="dark" label={paused ? labels.play : labels.pause} onClick={toggle}>
        {paused ? <Play {...icon} /> : <Pause {...icon} />}
      </IconButton>
    </span>
  );
}
