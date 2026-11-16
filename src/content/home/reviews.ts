/*
  Homepage section 8, Reviews. There are no real reviews yet, so `items` is empty and the section renders
  nothing: it needs at least three reviews with text, name and date. Rating and count are never shown.
*/
export type ReviewItem = {
  text: string;
  name: string;
  /** Display text, for example "March 2026". */
  date: string;
  /** The shop the review is for, for example "Lahore". */
  outlet: string;
  confirmed: boolean;
  source: string;
};

export const reviewsSection = {
  title: "What customers say on Google.",
  link: "Read our reviews on Google",
  minimum: 3,
  items: [] as ReviewItem[],
};
