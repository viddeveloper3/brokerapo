const express = require("express");
const router = express.Router();
const wishlistController = require("../Controller/wishlistController");

router.route("/wishlist/:id").post(wishlistController.addToWishList);
router.route("/wishlist/:id").get(wishlistController.getAllWishList);

module.exports = router;
