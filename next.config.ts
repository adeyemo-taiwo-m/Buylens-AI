import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/app", destination: "/dashboard", permanent: true },
      { source: "/app/analyze/loading", destination: "/analyze", permanent: true },
      { source: "/app/analyze", destination: "/analyze", permanent: true },
      { source: "/app/history", destination: "/history", permanent: true },
      { source: "/app/settings", destination: "/settings", permanent: true },
      { source: "/app/buttons", destination: "/dashboard", permanent: true },
      { source: "/app/report/:id/questions", destination: "/report/:id/questions", permanent: true },
      { source: "/app/report/:id/compare", destination: "/compare", permanent: true },
      { source: "/app/report/:id", destination: "/report/:id", permanent: true },
      { source: "/analysis/:id((?!.*\\.).*)", destination: "/report/:id", permanent: true },
    ];
  },
};

export default nextConfig;
