export const routes = {
  dashboard: {
    root: "/dashboard",
  },

  auth: {
    login: "/auth/login",
    callback: "/auth/callback",
  },

  home: "/",
} as const;
