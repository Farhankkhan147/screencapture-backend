module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "1377",
  DB: "screencapture",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
