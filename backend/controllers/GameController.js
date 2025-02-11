// const express = require("express");
// const router = express.Router();
const db = require("../config/db");

// router.get("/games", (req, res) => {
exports.getGameList = (req, res) => {
  db.query("SELECT * FROM games", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
};

// router.post("/games/create", (req, res) => {
exports.createGame = (req, res) => {
  const { game_name, genre, developer, release_date, platforms, game_image } = req.body;
  db.query(
    "INSERT INTO games (game_name, genre, developer, release_date, platforms, game_image, created_date, updated_date) VALUES (?,?,?,?,?,?,NOW(),NOW())",
    [game_name, genre, developer, release_date, platforms, game_image],
    (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ status: "error", message: "Failed to create game" });
      } else {
        res.status(200).json({ status: "success", message: "Game create successfully" });
      }
    }
  );
};

// router.put("/games/update/:id", (req, res) => {
exports.updateGame = (req, res) => {
  const { game_name, genre, developer, release_date, platforms, game_image, id } = req.body;
  db.query("UPDATE games SET game_name = ?, genre = ?, developer = ?, release_date = ?, platforms = ?, game_image = ?, updated_date = ? WHERE id = ?", [game_name, genre, developer, release_date, platforms, game_image, new Date(), id], (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).json({ status: "error", message: "Failed to update game" });
    } else {
      res.status(200).json({ status: "success", message: "Game update successfully" });
    }
  });
};

// router.delete("/games/delete/:id", (req, res) => {
exports.deleteGame = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM games WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send("Game deleted successfully");
    }
  });
};

// module.exports = router;
