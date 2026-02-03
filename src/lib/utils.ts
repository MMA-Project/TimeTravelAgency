import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]) {
  return clsx(inputs);
}
// Helper function to get the correct asset path for GitHub Pages
export function getAssetPath(path: string): string {
  const baseUrl = import.meta.env.BASE_URL || "/";
  if (path.startsWith("/")) {
    return baseUrl + path.slice(1);
  }
  return baseUrl + path;
}
