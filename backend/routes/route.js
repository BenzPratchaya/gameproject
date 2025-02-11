const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");
const UserRankController = require("../controllers/UserRankController");
const GameController = require("../controllers/GameController");

const multer = require("multer");
const path = require("path");
router.use(express.static(path.join(__dirname, "upload/images")));

const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    const originalName = file.originalname;
    return cb(null, originalName);
  },
});

// const storage = multer.diskStorage({
//   destination: "./upload/images",
//   filename: (req, file, cb) => {
//     const date = new Date();
//     const hours = String(date.getHours()).padStart(2, "0");
//     const minutes = String(date.getMinutes()).padStart(2, "0");
//     const seconds = String(date.getSeconds()).padStart(2, "0");
//     const timestamp = `${hours}${minutes}${seconds}`;

//     const originalName = file.originalname;
//     const ext = path.extname(originalName);
//     const nameWithoutExt = path.basename(originalName, ext);

//     const newFilename = `${nameWithoutExt}_${timestamp}${ext}`;
//     return cb(null, newFilename);
//   },
// });

const upload = multer({
  storage: storage,
});

// User routes
router.get("/users", UserController.getUserList);
router.get("/user/:id", UserController.getUserById);
router.get("/users/role_id/:role_id", UserController.getUserByRoleId);
router.put("/user/update/:id", UserController.updateUser);
router.delete("/user/delete/:id", UserController.deleteUser);

router.get("/user_ranks", UserRankController.getUserRankList);
router.post("/user_ranks/create", UserRankController.createUserRank);
router.put("/user_ranks/update/:id", UserRankController.updateUserRank);
router.delete("/user_ranks/delete/:id", UserRankController.deleteUserRank);

router.get("/games", GameController.getGameList);
router.post("/games/create", GameController.createGame);
router.put("/games/update/:id", GameController.updateGame);
router.delete("/games/delete/:id", GameController.deleteGame);

module.exports = router;
