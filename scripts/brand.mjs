// Favicons from the client's badge (design/img/brand-badge.png, the old site's favicon.ico, 500x500): its panel-and-sun
// mark on an ink disc inside a lime ring. The badge's wordmark and URL are dropped: unreadable at 16 to 180 px.
import sharp from "sharp";
import { readFileSync } from "node:fs";

const tokens = readFileSync("src/styles/tokens.css", "utf8");
const token = (n) => tokens.match(new RegExp(String.raw`--${n}:\s*(?:light-dark\()?(#[0-9a-fA-F]{6})`))[1];
const [INK, LIME] = [token("ink"), token("lime")];

// The panel and sun sit at x 162 to 337, y 49 to 175 in the badge, clear of its ring.
const MARK = { left: 162, top: 49, width: 176, height: 127 };
async function favicon(size, file, { square }) {
  const ring = Math.max(1.5, size * 0.045);
  const r = size / 2 - ring / 2 - (square ? size * 0.07 : 0.5);
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}">
    ${square ? `<rect width="${size}" height="${size}" fill="${INK}"/>` : `<circle cx="${size / 2}" cy="${size / 2}" r="${size / 2}" fill="${INK}"/>`}
    <circle cx="${size / 2}" cy="${size / 2}" r="${r}" fill="none" stroke="${LIME}" stroke-width="${ring}"/></svg>`;
  const w = Math.round(size * (square ? 0.5 : 0.64));
  const { data, info } = await sharp("design/img/brand-badge.png").extract(MARK).resize({ width: w, kernel: "lanczos3" }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  // The badge's black is not our ink: fade dark pixels out so no box shows round the mark.
  // Bits of the badge's ring at the crop corners (more than 205 px from the badge centre) go too.
  const k = MARK.width / info.width;
  for (let i = 0; i < data.length; i += 4) {
    const p = i / 4, x = MARK.left + (p % info.width) * k, y = MARK.top + Math.floor(p / info.width) * k;
    const inside = (x - 250) ** 2 + (y - 250) ** 2 < 205 ** 2;
    data[i + 3] = inside ? Math.min(255, Math.max(0, (Math.max(data[i], data[i + 1], data[i + 2]) - 24) * 4)) : 0;
  }
  const mark = await sharp(data, { raw: info }).png().toBuffer();
  const h = Math.round((w * MARK.height) / MARK.width);
  await sharp(Buffer.from(svg))
    .composite([{ input: mark, left: Math.round((size - w) / 2), top: Math.round((size - h) / 2) }])
    .png({ compressionLevel: 9 })
    .toFile(file);
  console.log(`${file} ${size}x${size}`);
}
await favicon(64, "src/app/icon.png", { square: false });
await favicon(180, "src/app/apple-icon.png", { square: true });
