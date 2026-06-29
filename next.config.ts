import type { NextConfig } from "next";

// When DEMO_BASE_PATH is set (by the plex-demo hub's build-landings script), build
// a static export mounted under that sub-path. The hub provides /api/leads, and the
// build script temporarily removes this app's app/api route (incompatible with
// output: 'export'). Otherwise build normally for the standalone modular-house deploy.
const demoBasePath = process.env.DEMO_BASE_PATH;

const nextConfig: NextConfig = demoBasePath
  ? {
      basePath: demoBasePath,
      assetPrefix: demoBasePath,
      output: "export",
      trailingSlash: true,
      // Expose the base path to the client so public assets (images, PDF) can be
      // prefixed too — next/image and plain <a href> do not add basePath for files in /public.
      env: { NEXT_PUBLIC_BASE_PATH: demoBasePath },
      experimental: { cpus: 1, workerThreads: true, webpackBuildWorker: false },
      images: { unoptimized: true, formats: ["image/avif", "image/webp"] }
    }
  : {
      env: { NEXT_PUBLIC_BASE_PATH: "" },
      // Shared hosting accounts commonly enforce a low process limit. Keeping
      // the build on one worker prevents Next.js from failing with spawn EAGAIN.
      experimental: { cpus: 1, workerThreads: true, webpackBuildWorker: false },
      images: {
        formats: ["image/avif", "image/webp"]
      }
    };

export default nextConfig;
