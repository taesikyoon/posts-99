require("dotenv").config();

const development = {
  username: process.env.DB_NAME,
  password: process.env.DB_PW,
  database: process.env.DB_DATABASE,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIA,
};
const test = {
  username: process.env.DB_NAME,
  password: null,
  database: "database_test",
  host: "127.0.0.1",
  dialect: process.env.DB_DIA,
};

const production = {
  username: process.env.DB_NAME,
  password: null,
  database: "database_production",
  host: "127.0.0.1",
  dialect: process.env.DB_DIA,
};
module.exports = { development, test, production };
