import {
  createRouter,
  createRoute,
  createRootRoute,
  Outlet,
} from "@tanstack/react-router";
import React from "react";
import DashboardPage from "../pages/dashboard/DashboardPage";
import LoginPage from "../pages/login/LoginPage";
import TopicPage from "../pages/topic/TopicPage";

// Create a root route
const rootRoute = createRootRoute({
  component: () => (
    <div id="root">
      <Outlet />
    </div>
  ),
});

// Create routes
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: DashboardPage,
});

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginPage,
});

const topicRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/topic/$topicId",
  component: TopicPage,
});

// Create the route tree
const routeTree = rootRoute.addChildren([indexRoute, loginRoute, topicRoute]);

// Create the router
export const router = createRouter({
  routeTree,
  defaultPreload: "intent",
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
