import { clsx, type ClassValue } from "clsx";

// ponytail: clsx only. Components never pass conflicting utilities, so no tailwind-merge.
export const cn = (...inputs: ClassValue[]) => clsx(inputs);
