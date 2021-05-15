const Joi = require('joi');

const userCreateSchema = Joi.object({
  name: Joi.string(),
  login: Joi.string(),
  password: Joi.string()
}).and('name', 'login', 'password');

const userUpdateSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  login: Joi.string(),
  password: Joi.string()
});

// const columnSchema = Joi.object({
//   title: Joi.string(),
//   order: Joi.number().integer(),
// });

const boardCreateSchema = Joi.object({
  title: Joi.string(),
  columns: Joi.array()
}).and('title', 'columns');

const boardUpdateSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string(),
  columns: Joi.array()
});

const taskCreateSchema = Joi.object({
  title: Joi.string(),
  order: Joi.number().integer(),
  description: Joi.string(),
  userId: Joi.any(),
  boardId: Joi.string(),
  columnId: Joi.any(),
}).and('title', 'order', 'description', 'userId', 'boardId', 'columnId');

const taskUpdateSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string(),
  order: Joi.number().integer(),
  description: Joi.string(),
  userId: Joi.string(),
  boardId: Joi.string(),
  columnId: Joi.string(),
});

module.exports = {
  userUpdateSchema,
  userCreateSchema,
  boardUpdateSchema,
  boardCreateSchema,
  taskUpdateSchema,
  taskCreateSchema
}
