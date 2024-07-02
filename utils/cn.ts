import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/* merge css styles */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
