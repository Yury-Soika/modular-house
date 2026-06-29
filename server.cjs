const fs = require("node:fs");
const http = require("node:http");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const socketPath = process.env.SOCKET_PATH || "/var/www/h211034/data/nodejs/5.sock";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  if (fs.existsSync(socketPath)) {
    fs.unlinkSync(socketPath);
  }

  const server = http.createServer((request, response) => handle(request, response));

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
