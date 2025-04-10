const express = require("express");
const router = express.Router();
const {
  checkPropertyFeild,
  checkUpdateFeild,
} = require("../Middlewares/propertyCheckFeild");
const propertyController = require("../Controller/propertyController");

router
  .route("/property")
  .post(checkPropertyFeild, propertyController.createProperty);
router.route("/properties").get(propertyController.getAllProperties);
router.route("/property/:id").get(propertyController.getPropertyById);
router
  .route("/property/:id")
  .patch(checkUpdateFeild, propertyController.updateProperty);
router.route("/property/:id").delete(propertyController.deleteProperty);

module.exports = router;
