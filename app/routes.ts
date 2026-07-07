import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
  index("routes/login.tsx"),
  route("login", "routes/login.tsx", { id: "login-route" }),
  route("signup", "routes/signup.tsx"),
  route("home", "routes/home.tsx"),
] satisfies RouteConfig;
