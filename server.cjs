const fs = require("node:fs");
const http = require("node:http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const canonicalOrigin = "https://modulsdom-brest.by";
const socketPath = process.env.SOCKET || process.env.SOCKET_PATH || "/var/www/h211034/data/nodejs/5.sock";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  if (fs.existsSync(socketPath)) {
    fs.unlinkSync(socketPath);
  }

  const server = http.createServer((request, response) => {
    const host = (request.headers.host || "").toLowerCase().split(":")[0];
    const forwardedProtoHeader = request.headers["x-forwarded-proto"];
    const forwardedProto = Array.isArray(forwardedProtoHeader) ? forwardedProtoHeader[0] : forwardedProtoHeader?.split(",")[0]?.trim();
    const mustUseCanonicalHost = host === "www.modulsdom-brest.by";
    const mustUseHttps = forwardedProto === "http" && (host === "modulsdom-brest.by" || mustUseCanonicalHost);

    if (!dev && (mustUseCanonicalHost || mustUseHttps)) {
      const requestPath = request.url?.startsWith("/") ? request.url.replace(/^\/{2,}/, "/") : "/";
      response.writeHead(301, { Location: `${canonicalOrigin}${requestPath}`, "Cache-Control": "public, max-age=3600" });
      response.end();
      return;
    }

    handle(request, response);
  });

  server.listen(socketPath, () => {
    fs.chmodSync(socketPath, 0o660);
    console.log(`Modul S is listening on ${socketPath}`);
  });

  const shutdown = () => {
    server.close(() => {
      if (fs.existsSync(socketPath)) fs.unlinkSync(socketPath);
      process.exit(0);
    });
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
