const express = require("express");
const con = require("../Db/connection.js");
const bcrypt = require("bcrypt");
const request = require("request");
const router = new express.Router();

router.route("/fooditems").get((req, res, next) => {
  con.query("SELECT * FROM Food_Items", (err, result) => {
    if (err) {
      res.status(500).send();
    } else {
      res.json(result);
    }
  });
});
router.route("/isLoggedIn").get((req, res) => {
  if (req.session.isLoggedIn === undefined) {
    req.session.isLoggedIn = false;
  }
  if (req.session.isLoggedIn === false) {
    res.status(401).send(false);
  } else {
    res.status(200).send(req.session.loggedName);
  }
});
router.route("/ownerAuth").get((req, res) => {
  if (req.session.ownerLoggedIn === undefined) {
    req.session.ownerLoggedIn = false;
  }
  if (req.session.ownerLoggedIn === false) {
    res.status(401).send(false);
  } else {
    res.status(200).send(true);
  }
});
router.route("/getCartItems").get((req, res) => {
  if (req.session.cart == undefined) {
    res.status(204).json();
  } else {
    res.status(200).json(req.session.cart);
  }
});

router.route("/signup").post((req, res) => {
  if (req.body.type === "user") {
    const fn = req.body.fullname;
    const email = req.body.email;
    const p = req.body.pass;
    let hashedPassword = "";
    let salt = bcrypt.genSaltSync();
    hashedPassword = bcrypt.hashSync(p, salt);
    var sql = "INSERT INTO users (fullname,email, pass) VALUES ";
    var info = "('" + fn + "','" + email + "','" + hashedPassword + "')";
    sql = sql + info;
    con.query(sql, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send("User entered successfully");
        req.session.loggedName = fn;
        req.session.loggedId = email;
        req.session.isLoggedIn = true;
      }
    });
  } else if (req.body.type === "owner") {
    const username = req.body.username;
    const p = req.body.pass;
    let hashedPassword = "";
    let salt = bcrypt.genSaltSync();
    hashedPassword = bcrypt.hashSync(p, salt);
    var sql = "INSERT INTO Owners (ownerName, pass) VALUES ";
    var info = "('" + username + "','" + hashedPassword + "')";
    sql = sql + info;
    con.query(sql, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(201).send("owner entered successfully");
      }
    });
  } else {
    res.status(401).send("Not authorized");
  }
});
router.route("/addToOrder").post((req, res) => {
  const quantity = req.body.quantity;
  if (req.session.cartindex == undefined) {
    req.session.cartindex = 0;
  }
  if (req.session.cart == undefined) {
    req.session.cart = [];
  }
  req.session.cart[req.session.cartindex] = req.body.food;
  req.session.cart[req.session.cartindex]["quantity"] = quantity;
  req.session.cartindex += 1;
  res.status(200).send(req.session.cart);
});
router.route("/logoutOwner").post((req, res) => {
  req.session.ownerLoggedIn = false;
  res.status(200).send(req.session.ownerLoggedIn);
});
router.route("/logoutUser").post((req, res) => {
  req.session.isLoggedIn = false;
  res.status(200).send("UserLogged Out");
});
router.route("/login").post((req, res) => {
  if (req.body.type === "user") {
    if (req.session.isLoggedIn == undefined) {
      req.session.isLoggedIn = false;
    }
    if (req.session.isLoggedIn == false) {
      const email = req.body.email;
      const pass = req.body.pass;
      var r = "";
      var sql = "SELECT * FROM users WHERE email='" + email + "'";
      con.query(sql, (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else if (result[0] === undefined) {
          res.status(401).send("User Not Found");
        } else {
          const encryptPass = result[0].pass;
          r = bcrypt.compareSync(pass, encryptPass);
          if (r == true) {
            req.session.isLoggedIn = true;
            req.session.ownerLoggedIn = false;
            req.session.loggedName = result[0].fullname;
            req.session.loggedId = email;
            res.status(202).send(req.session);
          } else {
            res.status(401).send(req.session);
          }
        }
      });
    } else if (req.session.isLoggedIn == true) {
      res.status(200).send("already logged IN");
    }
  } else if (req.body.type === "owner") {
    if (req.session.ownerLoggedIn == undefined) {
      req.session.ownerLoggedIn = false;
    }
    if (req.session.ownerLoggedIn == false) {
      const username = req.body.username;
      const pass = req.body.pass;
      var r = "";
      var sql = "SELECT * FROM Owners WHERE ownerName='" + username + "'";
      con.query(sql, (err, result) => {
        if (err) {
          res.status(500).send(err);
        } else if (result[0] === undefined) {
          res.status(401).send("Owner Not Found");
        } else {
          const encryptPass = result[0].pass;
          r = bcrypt.compareSync(pass, encryptPass);
          if (r == true) {
            req.session.ownerLoggedIn = true;
            req.session.isLoggedIn = false;
            req.session.ownerid = username;
            res.status(202).send(req.session);
          } else {
            res.status(401).send(req.session);
          }
        }
      });
    } else if (req.session.ownerLoggedIn == true) {
      res.status(200).send("already logged IN");
    }
  } else {
    res.status(401).send("Not user Or owner");
  }
});
router.route("/AddStock").post((req, res) => {
  const id = req.body.foodId;
  const act = req.body.action;
  const stock = req.body.TotalStock;
  var sql = "UPDATE Food_items SET stock='" + stock + "' WHERE id='" + id + "'";
  con.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(202).send("Stock Replenished");
    }
  });
});
router.route("/AddFoodItem").post((req, res) => {
  var sql =
    "INSERT INTO Food_Items(name,description,imageUrl,FoodType,price,stock) values ('" +
    req.body.itemName +
    "','" +
    req.body.itemDesc +
    "','" +
    req.body.itemImg +
    "','" +
    req.body.itemCat +
    "','" +
    req.body.itemPrice +
    "','" +
    req.body.itemStock +
    "')";
  con.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send("Item Added");
    }
  });
});
router.route("/RemoveFoodItem").post((req, res) => {
  const id = req.body.foodId;
  var sql = "DELETE FROM Food_items WHERE id='" + id + "'";
  con.query(sql, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send("Item Deleted");
    }
  });
});
router.route("/test").get((req, res, next) => {
  if (req.session.testvar == undefined) {
    req.session.testvar = 1;
  } else {
    req.session.testvar++;
  }
  res.send(req.session.cart);
});
router.route("/test2").get((req, res, next) => {
  request(
    "https://www.googleapis.com/books/v1/volumes?q=pride+prejudice&download=epub&key=AIzaSyCQCns4tu8y6ELUgtKASuExJebIvmSxjLw"
  ).pipe(res);
});

module.exports = router;
