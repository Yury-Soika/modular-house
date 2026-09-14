// Launch Node directly: an npm wrapper adds another process and thread pools.
module.exports = {
  apps: [{
    name: "modulsdom-brest",
    cwd: __dirname,
    script: "server.cjs",
    interpreter: process.env.HOSTER_NODE_PATH || "/var/www/h211034/data/.nvm/versions/node/v26.4.0/bin/node",
    node_args: "--v8-pool-size=1",
    exec_mode: "fork",
    instances: 1,
    watch: false,
    restart_delay: 3000,
    kill_timeout: 10000,
    env: {
      NODE_ENV: "production",
      SOCKET: "/var/www/h211034/data/nodejs/5.sock",
      UV_THREADPOOL_SIZE: "2",
      TOKIO_WORKER_THREADS: "1",
      RAYON_NUM_THREADS: "1",
      MALLOC_ARENA_MAX: "2",
      VIPS_CONCURRENCY: "1",
      NEXT_TELEMETRY_DISABLED: "1"
    }
  }]
};
