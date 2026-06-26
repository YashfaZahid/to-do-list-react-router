import { type RouteConfig, index, route } from "@react-router/dev/routes";
import { createBrowserRouter, redirect } from "react-router";
import Login from "./routes/login";
import Home from "./routes/home";
import Signup from "./routes/signup";




export default [
    index("routes/login.tsx"),
    route("Signup","routes/signup.tsx"),
    route("Home","routes/home.tsx"),

] satisfies RouteConfig;




