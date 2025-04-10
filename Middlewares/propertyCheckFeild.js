const AppError = require("../Utils/AppError");

exports.checkPropertyFeild = async (req, res, next) => {
  try {
    if (
      !req.body.propertyName ||
      !req.body.location ||
      !req.body.price ||
      !req.body.type ||
      !req.body.status ||
      !req.body.brokerName ||
      !req.body.contactNumber ||
      !req.body.features ||
      !req.body.description
    ) {
      return next(new AppError("Missing required fields", 400));
    }
    let data;
    let {
      propertyName,
      location,
      price,
      type,
      status,
      brokerName,
      contactNumber,
      features,
      description,
    } = req.body;
    if (typeof features === "string") {
      features = features.split(",");
    }
    if (req.body.image) {
      const image = req.body.image;
      data = {
        propertyName,
        location,
        price,
        image,
        type,
        status,
        brokerName,
        contactNumber,
        features,
        description,
      };
    } else {
      data = {
        propertyName,
        location,
        price,
        type,
        status,
        brokerName,
        contactNumber,
        features,
        description,
      };
    }
    req.data = data;
    next();
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

exports.checkUpdateFeild = async (req, res, next) => {
  try {
    if (
      req.body.propertyName ||
      req.body.location ||
      req.body.price ||
      req.body.type ||
      req.body.status ||
      req.body.brokerName ||
      req.body.contactNumber ||
      req.body.features ||
      req.body.description ||
      req.body.image
    ) {
      return next();
    }
    return next(new AppError("Invalid fields", 400));
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};
