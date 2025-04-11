const User = require("../Model/userModel");
const AppError = require("../Utils/AppError");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");

const jwtToken = function (id) {
  const token = jwt.sign({ id }, process.env.JWT_KEY, {
    expiresIn: process.env.JWT_EXPIRES,
  });
  return token;
};

exports.sendOTP = async (req, res, next) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);
    if (!req.body.phone) {
      return next(new AppError("No phone number.", 404));
    }
    const { phone } = req.body;
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verifications.create({ to: phone, channel: "sms" });
    res.status(201).json({
      phone: verification.to,
      status: verification.status,
      sid: verification.sid,
    });
  } catch (err) {
    return next(new AppError(err, 403));
  }
};
exports.VerifyOTP = async (req, res, next) => {
  try {
    const accountSid = process.env.TWILIO_ACCOUNT_SID;
    const authToken = process.env.TWILIO_AUTH_TOKEN;
    const client = require("twilio")(accountSid, authToken);
    if (!req.body.otp || !req.body.phone) {
      return next(new AppError("No OTP or No Phone.", 404));
    }
    const { otp, phone } = req.body;
    const verification = await client.verify.v2
      .services(process.env.TWILIO_VERIFY_SID)
      .verificationChecks.create({ to: phone, code: otp });

    if (verification.status === "approved") {
      const user = await User.findOne({ phone: phone });
      if (!user) {
        const new_user = await User.create({ phone: phone });
        const token = jwtToken(new_user._id);
        return res.status(201).json({
          status: "user successfully created.",
          message: new_user,
          verification_status: verification.status,
          token: token,
        });
      } else {
        const token = jwtToken(user._id);
        return res.status(201).json({
          status: "user successfully login.",
          message: user,
          verification_status: verification.status,
          token: token,
        });
      }
    } else {
      return next(new AppError("Invalid OTP", 403));
    }
    // res.status(200).json({
    //   phone: verification.to,
    //   status: verification.status,
    //   sid: verification.sid,
    // });
  } catch (err) {
    return next(new AppError(err, 403));
  }
};

exports.authenticated = async (req, res, next) => {
  try {
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }
    if (!token) {
      return next(
        new AppError("You are not logged in! Please log in to get access.", 401)
      );
    }
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_KEY);
    const user = await User.findById(decoded.id);
    if (!user) {
      return next(new AppError("User doesn't exist.", 401));
    }
    res.status(202).json({
      status: "success",
      message: user,
    });
  } catch (err) {
    return next(new AppError(err, 403));
  }
};
