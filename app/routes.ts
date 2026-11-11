import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),
  // Pages privées, protégées par le layout (pas d'URL propre)
  layout("routes/protected.tsx", [
    route("dashboard", "routes/dashboard.tsx"),
    route("profil", "routes/profil.tsx"),
  ]),
  route("*", "routes/not-found.tsx"),
] satisfies RouteConfig;
