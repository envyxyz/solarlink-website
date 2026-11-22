/*
  Quote form copy. Plain strings only: the form island and the Worker both import this file.
  Client code imports "@/content/quote".
*/

export const quote = {
  name: { label: "Your name", autoComplete: "name" },
  phone: { label: "Phone number", hint: "The outlet calls or messages you on this number.", autoComplete: "tel" },
  city: { label: "Nearest outlet" },
  property: {
    label: "What is it for",
    options: [
      { value: "home", label: "Home" },
      { value: "business", label: "Business" },
      { value: "farm", label: "Farm" },
    ],
  },
  bill: {
    label: "Monthly electricity bill (optional)",
    modes: [
      { value: "rs", label: "Rs" },
      { value: "units", label: "Units" },
    ],
    amount: { rs: "Bill in Rs", units: "Bill in units" },
    hint: "A rough figure is enough.",
  },
  message: { label: "Anything else we should know (optional)" },
  submit: "Send and open WhatsApp",
  /** Said under the button; the link goes to the privacy policy. */
  privacy: { text: "We keep a copy of what you send here so the outlet can reply.", link: "How your details are used", href: "/privacy-policy/" },
  errors: {
    name: "Enter your name.",
    phone: "Enter a phone number, for example 0321-1234567.",
    bill: "Enter the bill as a whole number, or leave it empty.",
    send: "That did not go through. Check the form and try again.",
    summary: "Please fix the highlighted fields.",
  },
  done: {
    heading: "Thank you, {name}.",
    opening: "Opening WhatsApp so you can send your message to the {city} outlet.",
    link: "Open WhatsApp",
    saved: "We have your details. The {city} outlet will get back to you on the number you gave.",
    noNumber: "We could not save this form just now. Please call the {city} outlet instead.",
  },
  /* The message the visitor sends on WhatsApp. No phone number in it: WhatsApp shows it already. */
  whatsapp: {
    intro: "Assalam o Alaikum SolarLink. My name is {name}. I am looking for solar for my {property} in {city}.",
    bill: { rs: "My monthly bill is about Rs {n}.", units: "I use about {n} units a month." },
    properties: { home: "home", business: "business", farm: "farm" } as Record<string, string>,
  },
};
