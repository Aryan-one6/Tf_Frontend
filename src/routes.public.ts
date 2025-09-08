// src/routes.public.ts
export type RouteEntry = {
  path: string;                 // e.g., "/about"
  children?: RouteEntry[];
  excludeFromSitemap?: boolean; // set true for pages you don't want indexed
};

export const publicRoutes: RouteEntry[] = [
  { path: "/" },
  { path: "/about" },
  { path: "/contact" },
  { path: "/blog" },
  { path: "/ai-agent-development" },
  { path: "/ai-automation" },
  { path: "/chatbot-development" },
  { path: "/digital-marketing" },
  { path: "/disclaimer" },
  { path: "/mobile-app-development" },
  { path: "/pricing" },
  { path: "/privacy" },
  { path: "/service" },
  { path: "/terms" },
  { path: "/web-development" },
  { path: "/blog/:slug"},

];
