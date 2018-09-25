const mongoose = require("mongoose");
const crypto = require("crypto");
const moment = require("moment-timezone");

/**
 * Reset Password Token Schema
 * @private
 */
const resetPasswordToken = new mongoose.Schema({
  token: {
    type: String,
    required: true,
    index: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  userEmail: {
    type: "String",
    ref: "User",
    required: true
  },
  expires: { type: Date }
});

resetPasswordToken.statics = {
  /**
   * Generate a reset password token object and saves it into the database
   *
   * @param {User} user
   * @returns {resetPasswordToken}
   */
  generate(user) {
    const userId = user._id;
    const userEmail = user.email;
    const token = `${userId}.${crypto.randomBytes(40).toString("hex")}`;
    const expires = moment()
      .add(30, "minutes")
      .toDate();
    const tokenObject = new ResetPasswordToken({
      token,
      userId,
      userEmail,
      expires
    });
    tokenObject.save();
    return tokenObject;
  }
};

/**
 * @typedef ResetPasswordToken
 */
const ResetPasswordToken = mongoose.model("RefreshToken", resetPasswordToken);
module.exports = ResetPasswordToken;
