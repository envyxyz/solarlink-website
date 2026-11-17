/*
  Homepage section 8, Reviews. These are the old site's testimonials (about-us.html and index.html). They are
  unconfirmed: they show only in preview builds, with the "Awaiting client" chip, and a production build leaves the
  section out. No rating, review count or review schema is shown or emitted. Each quote is verbatim from
  docs/research/content-inventory/testimonials.json (T06b, T08, T01b).
*/
export type ReviewItem = {
  text: string;
  name: string;
  /** Display text, for example "Islamabad". */
  place?: string;
  /** Display text, for example "March 2026". */
  date?: string;
  /** The shop the review is for, for example "Lahore". */
  outlet?: string;
  confirmed: boolean;
  source: string;
};

export const reviewsSection = {
  title: "What our customers say.",
  link: "Read our reviews on Google",
  mark: "“",
  minimum: 3,
  items: [
    {
      name: "Mian Amir Farooq",
      text: "I highly recommend Solar Link for their exceptional service and good quality solar energy solutions. Mr. Abdul Gaffar and his team were professional, efficient and courteous throughout the installation process.",
      confirmed: false,
      source: "Old site about-us.html, labelled 'Verified Google Review' (unverified): docs/research/content-inventory/testimonials.json T06b",
    },
    {
      name: "Anas Razzaq",
      text: "Truly professional by all means in the field of solar energy. The way of guiding from quotation to installation was impressive. Thank you Solarlink.",
      confirmed: false,
      source: "Old site about-us.html, labelled 'Verified Google Review' (unverified): docs/research/content-inventory/testimonials.json T08",
    },
    {
      name: "M. Usman",
      place: "Islamabad",
      text: "The system's a game-changer! No more high bills.",
      confirmed: false,
      source: "Old site about-us.html (unverified): docs/research/content-inventory/testimonials.json T01b",
    },
  ] as ReviewItem[],
};
