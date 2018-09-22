const httpStatus = require("http-status");
const { omit } = require("lodash");

const User = require("./user.model");
const APIError = require("../_utils/APIError");
const { handler: errorHandler } = require("../_middlewares/error");

/**
 * Load user and append to req.
 * @public
 */
exports.load = async (req, res, next, id) => {
  try {
    const user = await User.get(id);
    req.locals = { user };
    return next();
  } catch (error) {
    return errorHandler(error, req, res);
  }
};

/**
 * Get user
 * @public
 */
exports.get = (req, res) => res.json(req.locals.user.transform());

/**
 * Get logged in user info
 * @public
 */
exports.loggedIn = (req, res) => res.json(req.user.transform());

/**
 * Create new user
 * @public
 */
exports.create = async (req, res, next) => {
  try {
    const user = new User(req.body);
    const savedUser = await user.save();
    res.status(httpStatus.CREATED);
    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Replace existing user
 * @public
 */
exports.replace = async (req, res, next) => {
  try {
    const { user } = req.locals;
    const newUser = new User(req.body);
    const omitRole = user.role !== "admin" ? "role" : "";
    const newUserObject = omit(newUser.toObject(), "_id", omitRole);

    await user.update(newUserObject, { override: true, upsert: true });
    const savedUser = await User.findById(user._id);

    res.json(savedUser.transform());
  } catch (error) {
    next(User.checkDuplicateEmail(error));
  }
};

/**
 * Update existing user
 * @public
 */
exports.update = (req, res, next) => {
  const omitRole = req.locals.user.role !== "admin" ? "role" : "";
  const updatedUser = omit(req.body, omitRole, "password");
  const user = Object.assign(req.locals.user, updatedUser);

  user
    .save()
    .then(savedUser => res.json(savedUser.transform()))
    .catch(e => next(User.checkDuplicateEmail(e)));
};

/**
 * Update existing user password
 * @public
 */
exports.updatePassword = async (req, res, next) => {
  const err = {
    status: httpStatus.NOT_FOUND,
    isPublic: true
  };

  try {
    if (await req.locals.user.passwordMatches(req.body.password)) {
      const user = Object.assign(req.locals.user);
      user.set({ password: req.body.newPassword });
      user
        .save()
        .then(savedUser => res.json(savedUser.transform()))
        .catch(e => next(e));
    } else {
      err.message = "Incorrect password";
      throw new APIError(err);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Get user list
 * @public
 */
exports.list = async (req, res, next) => {
  try {
    const users = await User.list(req.query);
    const transformedUsers = users.map(user => user.transform());
    res.json(transformedUsers);
  } catch (error) {
    next(error);
  }
};

/**
 * Delete user
 * @public
 */
exports.remove = (req, res, next) => {
  const { user } = req.locals;

  user
    .remove()
    .then(() => res.status(httpStatus.NO_CONTENT).end())
    .catch(e => next(e));
};
