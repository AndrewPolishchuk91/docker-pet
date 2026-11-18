const { readFileSync } = require('node:fs');

module.exports = {
  db: {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT ?? 5432),
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: readFileSync(
      process.env.DB_PASSWORD_FILE,
      'utf8',
    ).trim(),
  },
};