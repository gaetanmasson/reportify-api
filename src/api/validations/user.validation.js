const Joi = require("joi");

const User = require("../models/user.model");

module.exports = {
  // GET /v1/users
  listUsers: {
    query: {
      page: Joi.number().min(1),
      perPage: Joi.number()
        .min(1)
        .max(100),
      name: Joi.object({
        firstName: Joi.string().max(128),
        middleName: Joi.string().max(128),
        lastName: Joi.string().max(128)
      }),
      email: Joi.string(),
      role: Joi.string().valid(User.roles)
    }
  },

  // POST /v1/users
  createUser: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .max(128)
        .required(),
      name: Joi.object({
        firstName: Joi.string().max(128),
        middleName: Joi.string().max(128),
        lastName: Joi.string().max(128)
      }),
      role: Joi.string().valid(User.roles)
    }
  },

  // PUT /v1/users/:userId
  replaceUser: {
    body: {
      email: Joi.string()
        .email()
        .required(),
      password: Joi.string()
        .min(6)
        .max(128)
        .required(),
      name: Joi.object({
        firstName: Joi.string().max(128),
        middleName: Joi.string().max(128),
        lastName: Joi.string().max(128)
      }),
      role: Joi.string().valid(User.roles)
    },
    params: {
      userId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },

  // PATCH /v1/users/:userId
  updateUser: {
    body: {
      email: Joi.string().email(),
      name: Joi.object({
        firstName: Joi.string().max(128),
        middleName: Joi.string().max(128),
        lastName: Joi.string().max(128)
      }),
      role: Joi.string().valid(User.roles)
    },
    params: {
      userId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  },

  // PATCH /v1/users/:usersId/update-password
  updatePassword: {
    body: {
      password: Joi.string()
        .min(6)
        .max(128)
        .required(),
      newPassword: Joi.string()
        .min(6)
        .max(128)
        .required()
    },
    params: {
      userId: Joi.string()
        .regex(/^[a-fA-F0-9]{24}$/)
        .required()
    }
  }
};
