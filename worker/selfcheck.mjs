// Validator self-check: node worker/selfcheck.mjs (Node reads the .ts files directly).
import assert from "node:assert/strict";
import { validate } from "./schema.ts";
import { quoteMessage } from "../src/lib/quote.ts";

const good = { name: "Ali Khan", phone: "0321-8425777", city: "lahore", property: "home", bill: 45000, billMode: "rs", message: "Roof is flat.", website: "", elapsed: 9000 };
const bad = (patch) => validate({ ...good, ...patch });

const ok = validate(good);
assert.equal(ok.ok, true, "good lead passes");
assert.equal(ok.data.phone, "03218425777", "phone is cleaned");
assert.equal(validate({ name: "Ali Khan", phone: "+92 321 8425777", city: "sargodha", property: "farm", elapsed: 5000 }).ok, true, "optional fields may be missing");

assert.equal(bad({ website: "http://spam" }).reason, "spam", "honeypot");
assert.equal(bad({ elapsed: 800 }).reason, "fast", "too fast");
assert.deepEqual(bad({ phone: "12345" }).fields, ["phone"], "bad phone");
assert.deepEqual(bad({ phone: "0321-ABCDEFG" }).fields, ["phone"], "letters in phone");
assert.deepEqual(bad({ name: "x".repeat(81) }).fields, ["name"], "name too long");
assert.deepEqual(bad({ message: "x".repeat(501) }).fields, ["message"], "message too long");
assert.deepEqual(bad({ city: "rawalpindi" }).fields, ["city"], "closed outlet");
assert.deepEqual(bad({ property: "castle" }).fields, ["property"], "unknown property");
assert.deepEqual(bad({ bill: -5 }).fields, ["bill"], "negative bill");
assert.equal(bad({ extra: "x" }).ok, false, "unknown key");
assert.equal(validate("nope").ok, false, "not an object");

const text = quoteMessage({ name: "Ali Khan", property: "home", city: "Lahore", bill: 45000, billMode: "rs", message: "Roof is flat." });
assert.match(text, /Ali Khan/);
assert.match(text, /Rs 45,000/);
assert.doesNotMatch(text, /0321/, "no phone number in the WhatsApp text");

console.log("worker selfcheck passed");
