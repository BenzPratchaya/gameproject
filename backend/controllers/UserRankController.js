// const express = require("express");
// const router = express.Router();
const db = require("../config/db");

// router.get("/user_ranks", (req, res) => {
exports.getUserRankList = (req, res) => {
  db.query("SELECT * FROM user_ranks", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

// router.post("/user_ranks/create", (req, res) => {
exports.createUserRank = (req, res) => {
  const { user_id, game_id, rank_id } = req.body;
  db.query(
    "INSERT INTO user_ranks (user_id, game_id, rank_id, created_date, updated_date) VALUES (?,?,?,?,?)",
    [user_id, game_id, rank_id, new Date(), new Date()],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Failed to create user_rank" });
      } else {
        res.status(200).json({ status: "success", message: "User_rank create successfully" });
      }
    }
  );
};

// router.put("/user_ranks/update/:id", (req, res) => {
exports.updateUserRank = (req, res) => {
  const { user_id, rank_id } = req.body;
  db.query("UPDATE user_ranks SET rank_id = ?, updated_date = ? WHERE user_id = ?", [rank_id, new Date(), user_id ], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ status: "error", message: "Failed to update user_rank" });
    } else {
      res.status(200).json({ status: "success", message: "User_rank update successfully" });
    }
  });
};

// router.delete("/user_ranks/delete/:id", (req, res) => {
exports.deleteUserRank = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM user_ranks WHERE user_id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send("User_rank deleted successfully");
    }
  });
};

// module.exports = router;
