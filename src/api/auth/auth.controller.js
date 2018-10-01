const httpStatus = require("http-status");
const moment = require("moment-timezone");

const { jwtExpirationInterval } = require("../../config/vars");
const RefreshToken = require("./refreshToken.model");
const User = require("../user/user.model");
const { transporter } = require("../../config/nodemailer");

/**
 * Returns a formated object with tokens
 * @private
 */
function generateTokenResponse(user, accessToken) {
  const tokenType = "Bearer";
  const refreshToken = RefreshToken.generate(user).token;
  const expiresIn = moment().add(jwtExpirationInterval, "minutes");
  return {
    tokenType,
    accessToken,
    refreshToken,
    expiresIn
  };
}

// TODO: make root url dynamic and test this function

function sendResetPasswordEmail(user, accessToken) {
  const { _id, firstName, lastName } = user;
  const url = `http://localhost:3000/${_id}/${accessToken}`;

  const mailOptions = {
    from: "test@test.com",
    to: user.email,
    subject: "Reset your password",
    template: "email",
    context: {
      firstName,
      lastName,
      url
    }
  };
  return transporter.sendMail(mailOptions);
}

/**
 * Returns jwt token if registration was successful
 * @public
 */
exports.register = async (req, res, next) => {
  try {
    const user = await new User(req.body).save();
    const userTransformed = user.transform();
    const token = generateTokenResponse(user, user.token());
    res.status(httpStatus.CREATED);
    return res.json({ token, user: userTransformed });
  } catch (error) {
    return next(User.checkDuplicateEmail(error));
  }
};

/**
 * Returns jwt token if valid username and password is provided
 * @public
 */
exports.login = async (req, res, next) => {
  try {
    const { user, accessToken } = await User.findAndGenerateToken(req.body);
    const token = generateTokenResponse(user, accessToken);
    const userTransformed = user.transform();
    return res.json({ token, user: userTransformed });
  } catch (error) {
    return next(error);
  }
};

/**
 * login with an existing user or creates a new one if valid accessToken token
 * Returns jwt token
 * @public
 */
exports.oAuth = async (req, res, next) => {
  try {
    const { user } = req;
    const accessToken = user.token();
    const token = generateTokenResponse(user, accessToken);
    const userTransformed = user.transform();
    return res.json({ token, user: userTransformed });
  } catch (error) {
    return next(error);
  }
};

/**
 * Returns a new jwt when given a valid refresh token
 * @public
 */
exports.refresh = async (req, res, next) => {
  try {
    const { email, refreshToken } = req.body;
    const refreshObject = await RefreshToken.findOneAndRemove({
      userEmail: email,
      token: refreshToken
    });
    const { user, accessToken } = await User.findAndGenerateToken({
      email,
      refreshObject
    });
    const response = generateTokenResponse(user, accessToken);
    return res.json(response);
  } catch (error) {
    return next(error);
  }
};

// TODO: finish controller

exports.forgot = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findByEmailAndGenerateToken({ email });
    return sendResetPasswordEmail(user);
  } catch (error) {
    return next(error);
  }
};
