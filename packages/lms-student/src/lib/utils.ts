import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Converts a human-readable title into a URL-safe slug.
export function slugify(title: string): string {
  return title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // remove non-alphanumeric except spaces and dashes
    .replace(/\s+/g, "-") // spaces to single dash
    .replace(/-+/g, "-"); // collapse multiple dashes
}

// Converts a slug back into a human-friendly Title Case string.
export function deslugify(slug: string): string {
  const spaced = slug.replace(/-/g, " ");
  return spaced.replace(/\b\w/g, (c) => c.toUpperCase());
}
