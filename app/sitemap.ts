import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

const routes = [
  "",
  "/about",
  "/how-i-help",
  "/out-of-state-owners",
  "/probate-and-difficult-deals",
  "/home-value",
  "/reviews",
  "/contact",
  "/es",
  "/privacy",
  "/accessibility",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return routes.map((path) => ({
    url: `${site.baseUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/home-value" || path === "/contact" ? 0.9 : 0.7,
  }));
}
