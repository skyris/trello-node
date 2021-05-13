const router = require('express').Router();
const boardsService = require('./board.service');
const Board = require('./board.model');
const wrapAsync = require('../../utils/wrapAsync');

router.route('/').get(
  wrapAsync(async (req, res) => {
    const boards = await boardsService.readAll();
    res.json(boards.map(Board.toResponse));
  })
);

router.route('/:boardId').get(
  wrapAsync(async (req, res) => {
    const {boardId} = req.params;
    const board = await boardsService.read(boardId);
    res.status(200).send(Board.toResponse(board));
  })
);

router.route('/:boardId').delete(
  wrapAsync(async (req, res) => {
    const {boardId} = req.params;
    await boardsService.remove(boardId);
    res.sendStatus(204);
  })
);

router.route('/').post(
  wrapAsync(async (req, res) => {
    const board = await boardsService.create(Board.fromRequest(req.body));
    res.status(201).send(Board.toResponse(board));
  })
);

router.route('/:boardId').put(
  wrapAsync(async (req, res) => {
    const {boardId} = req.params;
    const board = await boardsService.update({id: boardId}, req.body);
    res.status(200).send(Board.toResponse(board));
  })
);

module.exports = router;
