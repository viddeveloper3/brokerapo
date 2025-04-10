const express = require("express");
const router = express.Router();
const userContoller = require("../Controller/userController");

router.route("/users").get(userContoller.getAllUsers);
router.route("/users/:id").get(userContoller.getUser);
router.route("/users/:id").patch(userContoller.updateUser);
router.route("/users/:id").delete(userContoller.deleteUser);

module.exports = router;
