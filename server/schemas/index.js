const Joi = require('joi');

const categories = [
  'CPU',
  'CPU Cooler',
  'Motherboard',
  'Memory',
  'Storage',
  'Video Card',
  'Power Supply',
  'Case',
];

const loginSchema = Joi.object({
  email: Joi.string()
    .email()
    .required(),
  password: Joi.string()
    .alphanum()
    .min(3)
    .max(15)
    .required(),
});

// TODO
const signupSchema = Joi.object({
  firstName: Joi.string()
    .required(),
  lastName: Joi.string()
    .required(),
}).concat(loginSchema);

const listingSchema = Joi.object({
  title: Joi.string()
    .trim()
    .max(30)
    .required(),
  description: Joi.string()
    .trim()
    .max(300)
    .required(),
  category: Joi.string()
    .valid(...categories),
  price: Joi.number()
    .min(0)
    .max(1000000)
    .required(),
});

// Validate a user/listing pk/fk
const idSchema = Joi.number()
  .positive()
  .required();

function validateSchema(schema) {
  return async (req, res, next) => {
    try {
      const value = await schema.validateAsync(req.body);
      req.body = value;
      return next();
    } catch (err) {
      return res.status(400).json(err);
    }
  };
}

module.exports = {
  loginSchema,
  signupSchema,
  listingSchema,
  idSchema,
  validateSchema,
};
