require("dotenv").config();

const development = {
  username: DB_NAME,
  password: DB_PW,
  database: DB_DATABASE,
  host: DB_HOST,
  dialect: DB_DIA,
};
const test = {
  username: DB_NAME,
  password: null,
  database: "database_test",
  host: "127.0.0.1",
  dialect: DB_DIA,
};

const production = {
  username: DB_NAME,
  password: null,
  database: "database_production",
  host: "127.0.0.1",
  dialect: DB_DIA,
};
module.exports = { development, test, production };
