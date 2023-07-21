"use strict";

var _pg = require("pg");
const pool = new _pg.Pool({
  host: process.env.HOST,
  port: process.env.PGPORT,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD
});
module.exports = pool;