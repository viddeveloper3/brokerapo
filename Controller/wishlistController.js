const User = require("../Model/userModel");
const AppError = require("../Utils/AppError");
const Property = require("../Model/propertyModel");

exports.addToWishList = async (req, res, next) => {
  let isAdded;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new AppError("User does n't exist."), 404);
    }
    if (!req.body.propertyId) {
      return next(new AppError("The body doesn't contain property id."), 404);
    }
    if (user.wishlist.includes(req.body.propertyId)) {
      user.wishlist = user.wishlist.filter((el) => el != req.body.propertyId);
      isAdded = false;
    } else {
      user.wishlist.push(req.body.propertyId);
      isAdded = true;
    }

    await user.save();
    res.status(201).json({
      status: "success",
      message: user,
      isAdded,
    });
  } catch (err) {
    return next(new AppError(err, 403));
  }
};

exports.getAllWishList = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new AppError("User does n't exist.", 404));
    }
    if (user.wishlist.length === 0) {
      return res.status(201).json({
        status: "success",
        message: "No Wishlist.",
      });
    }
    const properties = await Property.find({ _id: { $in: user.wishlist } });
    res.status(200).json({
      status: "success",
      length: properties.length,
      message: properties,
    });
  } catch (err) {
    return next(new AppError(err, 403));
  }
};
