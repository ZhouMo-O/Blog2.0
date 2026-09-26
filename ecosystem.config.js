const path = require("path");

// 以本文件所在目录为基准，避免写死部署路径，
// 这样任何人 clone 到任意目录后都能直接用 pm2 start 起服务。
const ROOT = __dirname;

module.exports = {
  apps: [
    {
      name: "blog-web",
      cwd: path.join(ROOT, "web"),
      script: "server/index.js",
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "600M",
      kill_timeout: 5000,
      env: {
        NODE_ENV: "production",
        HOST: "127.0.0.1",
        PORT: "3000"
      }
    },
    {
      name: "blog-api",
      cwd: path.join(ROOT, "server"),
      script: "index.js",
      interpreter: "node",
      instances: 1,
      exec_mode: "fork",
      autorestart: true,
      max_memory_restart: "400M",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
