const router = require('express').Router();
const usersService = require('./user.service');
const User = require('./user.model');
const wrapAsync = require('../../utils/wrapAsync');
const validate = require('../../validation/validator');
const {userCreateSchema, userUpdateSchema} = require('../../validation/schemas');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const users = await usersService.readAll();
    res.json(users.map(User.toResponse));
  })
);

router.route('/:userId').get(
  wrapAsync(async (req, res) => {
    const {userId} = req.params;
    const user = await usersService.read(userId);
    res.status(200).send(User.toResponse(user));
  })
);

router.route('/:userId').delete(
  wrapAsync(async (req, res) => {
    const {userId} = req.params;
    await usersService.remove(userId);
    res.sendStatus(204);
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const {body} = req;
    await validate(userCreateSchema, body);
    const user = await usersService.create(User.fromRequest(body));
    res.status(201).send(User.toResponse(user));
  })
);

router.route('/:userId').put(
  wrapAsync(async (req, res) => {
    const {body} = req;
    await validate(userUpdateSchema, body);
    const {userId} = req.params;
    const user = await usersService.update({id: userId}, body);
    res.status(200).send(User.toResponse(user));
  })
);

module.exports = router;
