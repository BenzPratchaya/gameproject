const express = require("express");
const router = express.Router();
const db = require("../config/db");

// create application/json parser
var bodyParser = require("body-parser");
var jsonParser = bodyParser.json();

// create libary hash password
const bcrypt = require("bcrypt");
const saltRounds = 10;

var jwt = require("jsonwebtoken");
const secret = "Fullstack-Login";
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regular Expression สำหรับตรวจสอบรูปแบบของ email

router.post("/register", jsonParser, function (req, res, next) {
  db.query("SELECT * FROM users WHERE email = ?", [req.body.email], function (err, results) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }
    if (results.length > 0) {
      res.status(400).json({ status: "error", message: "Email already exists" });
    } else if (!emailRegex.test(req.body.email)) {
      res.status(400).json({ status: "error", message: "Invalid email format" });
    } else {
      bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        db.query(
          "INSERT INTO users (email, password, fname, lname, role_id, created_date, updated_date) VALUES (?,?,?,?,1,?,?)",
          [req.body.email, hash, req.body.fname, req.body.lname, new Date(), new Date()],
          function (err, results) {
            if (err) {
              res.json({ status: "error", message: err });
              return;
            }

            res.json({ status: "ok" });
          }
        );
      });
    }
  });
});

router.post("/register/admin", jsonParser, function (req, res, next) {
  db.query("SELECT * FROM users WHERE email = ?", [req.body.email], function (err, results) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }
    if (results.length > 0) {
      res.status(400).json({ status: "error", message: "Email already exists" });
    } else if (!emailRegex.test(req.body.email)) {
      res.status(400).json({ status: "error", message: "Invalid email format" });
    } else {
      bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
        if (err) {
          res.json({ status: "error", message: err });
          return;
        }
        db.query(
          "INSERT INTO users (email, password, fname, lname, role_id, created_date, updated_date) VALUES (?,?,?,?,2,?,?)",
          [req.body.email, hash, req.body.fname, req.body.lname, new Date(), new Date()],
          function (err, results) {
            if (err) {
              res.json({ status: "error", message: err });
              return;
            }
            res.json({ status: "ok" });
          }
        );
      });
    }
  });
});

router.post("/login", jsonParser, function (req, res, next) {
  db.query("SELECT * FROM users WHERE email = ?", [req.body.email], function (err, users) {
    if (err) {
      res.json({ status: "error", message: err });
      return;
    }
    if (users.length == 0) {
      res.json({ status: "error", message: "no user found" });
      return;
    }
    bcrypt.compare(req.body.password, users[0].password, function (err, isLogin) {
      if (isLogin) {
        var token = jwt.sign(
          { email: users[0].email },
          secret
          // { expiresIn: "1h",}
        );
        res.json({
          status: "ok",
          message: "login success",
          token,
          user: users[0],
        });
      } else {
        res.json({ status: "error", message: "login failed" });
      }
    });
  });
});

router.post("/authen", jsonParser, function (req, res, next) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, secret);
    res.json({ status: "ok", decoded });
  } catch (err) {
    res.json({ status: "error", message: err.message });
  }
});

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401); // Unauthorized

  jwt.verify(token, secret, (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next(); // ถ้า token ถูกต้อง ส่งต่อไปยัง middleware ถัดไป
  });
}

router.get("/profile", authenticateToken, (req, res) => {
  const userEmail = req.user.email;

  db.query("SELECT * FROM users WHERE email = ?", [userEmail], (err, results) => {
    if (err) {
      return res.status(500).json({ status: "error", message: "Failed to fetch user data" });
    }

    if (results.length === 0) {
      return res.status(404).json({ status: "error", message: "User not found" });
    }

    const user = results[0];
    res.json({ status: "success", user });
  });
});

module.exports = router;
