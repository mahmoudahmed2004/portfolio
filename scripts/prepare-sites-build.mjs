import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const root = process.cwd();
const exportDirectory = path.join(root, "out");
const deploymentDirectory = path.join(root, "dist");
const clientDirectory = path.join(deploymentDirectory, "client");
const serverDirectory = path.join(deploymentDirectory, "server");

await rm(deploymentDirectory, { recursive: true, force: true });
await mkdir(clientDirectory, { recursive: true });
await mkdir(serverDirectory, { recursive: true });
await cp(exportDirectory, clientDirectory, { recursive: true });

const worker = `const extensionlessRoutes = new Set(["/", "/cv"]);

function withSecurityHeaders(response) {
  const headers = new Headers(response.headers);
  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=()");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function fetchAsset(request, env, pathname) {
  const url = new URL(request.url);
  url.pathname = pathname;
  return env.ASSETS.fetch(new Request(url, request));
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    let response = await env.ASSETS.fetch(request);

    if (response.status === 404 && extensionlessRoutes.has(url.pathname)) {
      const pathname = url.pathname === "/" ? "/index.html" : url.pathname + ".html";
      response = await fetchAsset(request, env, pathname);
    }

    if (response.status === 404) {
      response = await fetchAsset(request, env, "/404.html");
    }

    return withSecurityHeaders(response);
  },
};
`;

await writeFile(path.join(serverDirectory, "index.js"), worker, "utf8");
console.log("Prepared Sites deployment in dist/.");
