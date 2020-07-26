const express = require("express");
const mysql = require("mysql");
const port = 5000;
const app = express();
const router = new express.Router();
const con = require("./Db/connection.js");
const { queries } = require("./routers");
const bodyParser = require("body-parser");
const cors = require("cors");
var session = require("express-session");
var cookieParser = require("cookie-parser");

con.query("SELECT 1 + 1 AS solution", function (err, rows, fields) {
  if (err) throw err;

  console.log("Database Connected");
});
app.use(express.json());
app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
var MemoryStore = session.MemoryStore;
app.use(
  session({
    name: "app.sid",
    secret: "1234567890QWERTY",
    resave: true,
    store: new MemoryStore(),
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60,
    },
  })
);
app.use(queries);

//app.get("/fooditems", (req, res) => {
//  connection.query("SELECT * FROM Food_Items", (err, result) => {
//    if (err) throw err;
//    res.send(result);
//  });
//});
//router.route("/fooditems").get((req, res, next) => {
//  con.query("SELECT * FROM Food_Items", (err, result) => {
//    if (err) throw err;
//    res.send(result);
//  });
//});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

module.exports = router;
