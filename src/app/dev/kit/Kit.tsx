"use client";

import { useState, type ReactNode } from "react";
import { ArrowRight, Phone } from "lucide-react";
import kit, { sampleGoogleUrl, sampleReviews } from "@/content/kit";
import { Reviews } from "@/components/home/Reviews";
import hero from "../../../../design/img/hero.jpg";
import { Accordion } from "@/components/ui/Accordion";
import { Button, IconButton } from "@/components/ui/Button";
import { Card, CardBody, CardImage } from "@/components/ui/Card";
import { Chip, SelectableChip, StatChip } from "@/components/ui/Chip";
import { Field, Select, Textarea } from "@/components/ui/Field";
import { icon } from "@/components/ui/icons";
import { Marquee } from "@/components/ui/Marquee";
import { Price, formatPrice } from "@/components/ui/Price";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { Slider } from "@/components/ui/Slider";
import { Stage } from "@/components/ui/Stage";
import { StatBlock } from "@/components/ui/StatBlock";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { popIn, type SpringName } from "@/lib/spring";

const Group = ({ title, children }: { title: string; children: ReactNode }) => (
  <section className="flex flex-col gap-6">
    <h3 className="text-h3">{title}</h3>
    {children}
  </section>
);
const Row = ({ children }: { children: ReactNode }) => <div className="flex flex-wrap items-center gap-4">{children}</div>;

function Tokens() {
  return (
    <>
      <Group title={kit.groups.colour}>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {kit.colours.map((c) => (
            <div key={c.name} className="flex flex-col gap-2">
              <div className={`${c.cls} h-16 rounded-tile outline outline-1 outline-line`} />
              <span className="text-caption">{c.name}</span>
            </div>
          ))}
        </div>
      </Group>
      <Group title={kit.groups.type}>
        <div className="flex flex-col gap-4">
          {kit.typeStyles.map((t) => (
            <div key={t.name} className="flex flex-col gap-1">
              <span className="text-caption text-tone-ink-2">{t.name}</span>
              <span className={t.cls}>{t.name === "figure" ? kit.figureSample : kit.typeSample}</span>
            </div>
          ))}
        </div>
      </Group>
      <Group title={kit.groups.space}>
        <div className="flex flex-col gap-2">
          {kit.space.map((s) => (
            <div key={s.name} className="flex items-center gap-4">
              <span className="w-12 text-caption tabular">{s.name}</span>
              <div className={`${s.cls} h-3 rounded-pill bg-lime`} />
            </div>
          ))}
        </div>
      </Group>
      <Group title={kit.groups.shape}>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
          {kit.radii.map((r) => (
            <div key={r.name} className="flex flex-col gap-2">
              <div className={`${r.cls} h-24 bg-tone-surface outline outline-1 outline-line`} />
              <span className="text-caption">{r.name}</span>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          <div className="rounded-card bg-tone-surface p-6 text-small">{kit.depth.rest}</div>
          <div className="rounded-card bg-tone-surface p-6 text-small shadow-float">{kit.depth.float}</div>
          <Stage nested variant="image" image={{ src: hero, alt: kit.stage.imageAlt, width: hero.width, height: hero.height }} className="col-span-2 flex gap-4 p-6">
            <div className="glass rounded-card p-4 text-small text-ink">{kit.depth.glass}</div>
            <div className="glass-night rounded-card p-4 text-small text-night-ink">{kit.depth.glassNight}</div>
          </Stage>
        </div>
      </Group>
    </>
  );
}

/** Plays a spring pop when the element mounts (a new key remounts it). */
const popRef = (name: SpringName) => (el: HTMLElement | null) => {
  if (el) popIn(el, name, 0.6);
};

function MotionDemo() {
  const [round, setRound] = useState(0);
  return (
    <Group title={kit.groups.motion}>
      <Row>
        <Button variant="quiet" onClick={() => setRound((r) => r + 1)}>
          {kit.motion.replay}
        </Button>
        {kit.motion.springs.map((name) => (
          <div key={`${name}-${round}`} ref={popRef(name)} className="grid size-20 place-items-center rounded-card bg-lime text-on-lime">
            <span className="text-caption">{name}</span>
          </div>
        ))}
        <div key={`entry-${round}`} data-reveal="" className="rounded-card bg-tone-surface p-4 text-small">
          {kit.motion.entry}
        </div>
        <div key={`pop-${round}`} ref={popRef("bubbly")} className="rounded-card bg-tone-surface p-4 text-small">
          {kit.motion.pop}
        </div>
        <div className="press rounded-card bg-tone-surface p-4 text-small">{kit.motion.press}</div>
      </Row>
      <div className="grid gap-4 md:grid-cols-3">
        <Card interactive>
          <CardImage src={hero} alt={kit.card.imageAlt} width={hero.width} height={hero.height} className="aspect-video" />
          <CardBody>
            <p className="text-small text-tone-ink-2">{kit.motion.hover}</p>
          </CardBody>
        </Card>
        <div className="grid place-items-center rounded-card bg-tone-surface p-6">
          <Button size="lg">{kit.motion.magnet}</Button>
        </div>
      </div>
    </Group>
  );
}

function Components() {
  const [bill, setBill] = useState(45000);
  const [mode, setMode] = useState("rs");
  const [grid, setGrid] = useState("on");
  const [picked, setPicked] = useState<string[]>([kit.chips.selectable[0]]);
  const [round, setRound] = useState(0);
  const toggle = (name: string) => setPicked((p) => (p.includes(name) ? p.filter((x) => x !== name) : [...p, name]));

  return (
    <Group title={kit.groups.components}>
      <Row>
        {kit.buttons.variants.map((v) => (
          <Button key={v.variant} variant={v.variant}>
            {v.label}
          </Button>
        ))}
      </Row>
      <Row>
        {kit.buttons.variants.map((v) => (
          <Button key={v.variant} variant={v.variant} disabled>
            {kit.buttons.states.disabled}
          </Button>
        ))}
        {kit.buttons.variants.map((v) => (
          <Button key={v.variant} variant={v.variant} loading>
            {kit.buttons.states.loading}
          </Button>
        ))}
      </Row>
      <Row>
        {kit.buttons.variants.map((v) => (
          <Button key={v.variant} variant={v.variant} size="lg">
            {kit.buttons.states.lg}
          </Button>
        ))}
        <Button twin={{ icon: <Phone {...icon} />, label: kit.buttons.twinLabel }}>{kit.buttons.twin}</Button>
      </Row>
      <Row>
        <span className="text-caption">{kit.buttons.iconRow}</span>
        {kit.buttons.variants.map((v) => (
          <IconButton key={v.variant} variant={v.variant} label={kit.buttons.iconLabel}>
            <ArrowRight {...icon} />
          </IconButton>
        ))}
        <IconButton label={kit.buttons.iconLabel} disabled>
          <ArrowRight {...icon} />
        </IconButton>
        <IconButton label={kit.buttons.iconLabel} loading>
          <ArrowRight {...icon} />
        </IconButton>
      </Row>
      <Row>
        <WhatsAppButton>{kit.whatsapp.pill}</WhatsAppButton>
        <WhatsAppButton iconOnly />
        <WhatsAppButton loading>{kit.whatsapp.loading}</WhatsAppButton>
      </Row>

      <Row>
        <Chip>{kit.chips.static}</Chip>
        <Chip glass>{kit.chips.static}</Chip>
        {kit.chips.selectable.map((name) => (
          <SelectableChip key={name} selected={picked.includes(name)} onSelectedChange={() => toggle(name)}>
            {name}
          </SelectableChip>
        ))}
        <SelectableChip selected={false} onSelectedChange={() => {}} disabled>
          {kit.buttons.states.disabled}
        </SelectableChip>
      </Row>
      <Row>
        {kit.chips.stat.map((s) => (
          <StatChip key={s.label} value={s.value} label={s.label} popKey={round} />
        ))}
        <StatChip glass value={kit.chips.stat[0].value} label={kit.chips.stat[0].label} popKey={round} />
        <Button variant="quiet" onClick={() => setRound((r) => r + 1)}>
          {kit.motion.replay}
        </Button>
      </Row>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="flex flex-col gap-4">
          <Row>
            <span className="text-figure tabular">{mode === "rs" ? formatPrice(bill) : bill}</span>
            <SegmentedControl label={kit.segmented.label} options={[...kit.segmented.options]} value={mode} onValueChange={setMode} />
          </Row>
          <Slider label={kit.slider.label} value={bill} onValueChange={setBill} min={5000} max={300000} step={1000} valueText={formatPrice(bill)} />
          <Slider label={kit.slider.label} value={bill} onValueChange={setBill} min={5000} max={300000} step={1000} disabled />
          <SegmentedControl label={kit.segmented.label} options={[...kit.segmented.three]} value={grid} onValueChange={setGrid} />
        </div>
        <div className="flex flex-col gap-4">
          <Field label={kit.fields.name} placeholder={kit.fields.namePlaceholder} hint={kit.fields.hint} />
          <Field label={kit.fields.phone} defaultValue="0" error={kit.fields.error} />
          <Select label={kit.fields.city} options={[...kit.fields.cityOptions]} placeholder={kit.fields.cityPlaceholder} defaultValue="" />
          <Textarea label={kit.fields.notes} />
          <Field label={kit.fields.disabled} disabled />
          <Field label={kit.fields.loading} loading />
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card interactive>
          <CardImage src={hero} alt={kit.card.imageAlt} width={hero.width} height={hero.height} className="aspect-video" />
          <CardBody>
            <h4 className="text-title">{kit.card.title}</h4>
            <p className="text-small text-tone-ink-2">{kit.card.spec}</p>
            <Row>
              <Price mode="show" amount={kit.price.amount} />
              <Price mode="ask" />
              <Price mode="hidden" />
            </Row>
          </CardBody>
        </Card>
        <div className="flex flex-col gap-6">
          <SectionHeading title={kit.heading.title} lead={kit.heading.lead} />
          <Row>
            <StatBlock stat={{ value: kit.price.amount, confirmed: true, source: kit.title }} label={kit.stats.label} />
            <StatBlock stat={{ value: kit.price.amount, confirmed: false, source: kit.title }} label={kit.stats.unconfirmedLabel} />
          </Row>
          <Price mode="show" amount={kit.price.bigAmount} />
        </div>
      </div>

      <Accordion items={[...kit.accordion]} />

      <div className="flex flex-col gap-4">
        <span className="text-caption text-tone-ink-2">{kit.marquee.plain}</span>
        <Marquee>
          {kit.marquee.items.map((name) => (
            <span key={name} className="text-h3">
              {name}
            </span>
          ))}
        </Marquee>
        <span className="text-caption text-tone-ink-2">{kit.marquee.logo}</span>
        <Marquee variant="logo">
          {kit.marquee.items.map((name) => (
            <span key={name} className="text-h3">
              {name}
            </span>
          ))}
        </Marquee>
      </div>
    </Group>
  );
}

function Showcase() {
  return (
    <div className="flex flex-col gap-16">
      <Tokens />
      <MotionDemo />
      <Components />
    </div>
  );
}

export function Kit() {
  return (
    <main id="main" className="flex flex-col gap-section py-section">
      <div className="page-width">
        <h1 className="text-display">{kit.title}</h1>
        <p className="mt-4 max-w-prose text-lead text-ink-2">{kit.note}</p>
      </div>
      <div className="page-width">
        <h2 className="mb-8 text-h2">{kit.grounds.light}</h2>
        <Showcase />
      </div>
      <Reviews items={sampleReviews} googleUrl={sampleGoogleUrl} />
      <Stage variant="night" className="p-6 md:p-12">
        <h2 className="mb-8 text-h2">{kit.grounds.night}</h2>
        <Showcase />
      </Stage>
    </main>
  );
}
