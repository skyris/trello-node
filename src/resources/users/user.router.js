const router = require('express').Router();
const usersService = require('./user.service');
const User = require('./user.model');
const wrapAsync = require('../../utils/wrapAsync');

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
    const user = await usersService.create(User.fromRequest(req.body));
    res.status(201).send(User.toResponse(user));
  })
);

router.route('/:userId').put(
  wrapAsync(async (req, res) => {
    const {userId} = req.params;
    const user = await usersService.update({id: userId}, req.body);
    res.status(200).send(User.toResponse(user));
  })
);

module.exports = router;
