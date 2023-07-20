import { Pool } from "pg";


const pool = new Pool({
  host: process.env.HOST,
  port: process.env.PGPORT,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
})


module.exports = pool