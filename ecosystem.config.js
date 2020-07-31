module.exports = {
  apps: [
    {
      name: "API",
      script: "./build/index.js",
      env: {
        NODE_ENV: "development",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};

// ! scripts
// * pm2를 사용할 경우
// "start": "pm2 start ecosystem.config.js --env production"
// * nodemon을 사용할 경우
// "start": "NODE_ENV=production nodemon build"
