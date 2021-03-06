const router = require('express').Router({mergeParams: true});
const tasksService = require('./task.service');
const Task = require('./task.model');
const wrapAsync = require('../../utils/wrapAsync');
// const validate = require('../../validation/validator');
// const {taskCreateSchema, taskUpdateSchema} = require('../../validation/schemas');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const {boardId} = req.params;
    const tasks = await tasksService.find({boardId});
    res.json(tasks.map(Task.toResponse));
  })
);

router.route('/:taskId').get(
  wrapAsync(async (req, res) => {
    const {boardId, taskId: id} = req.params;
    const task = await tasksService.findOne({boardId, id});
    res.status(200).send(Task.toResponse(task));
  })
);

router.route('/:taskId').delete(
  wrapAsync(async (req, res) => {
    const {boardId, taskId: id} = req.params;
    await tasksService.remove({boardId, id});
    res.sendStatus(204);
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const {boardId} = req.params;
    const {body} = req;
    // await validate(taskCreateSchema, body);
    const task = await tasksService.create(
      Task.fromRequest({...body, boardId})
    );
    res.status(201).send(Task.toResponse(task));
  })
);

router.route('/:taskId').put(
  wrapAsync(async (req, res) => {
    const {body} = req;
    // await validate(taskUpdateSchema, body);
    const {boardId, taskId: id} = req.params;
    const task = await tasksService.update(
      {boardId, id}, body
    );
    res.status(200).send(Task.toResponse(task));
  })
);

module.exports = router;
