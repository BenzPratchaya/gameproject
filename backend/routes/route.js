const express = require("express");
const router = express.Router();
const UserController = require("../controllers/UserController");

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
router.get("/users/countmonth", UserController.getUserCountMonth);
router.put("/user/update/:id", UserController.updateUser);
router.delete("/user/delete/:id", UserController.deleteUser);

module.exports = router;
