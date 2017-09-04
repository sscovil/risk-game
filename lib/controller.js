'use strict';

const engine = require('./engine');
const logger = require('winston');
const objection = require('objection');

const ValidationError = objection.ValidationError;

const tryCatch = async (req, res, fn) => {
  try {
    return res.json(await fn());
  }
  catch(err) {
    if (err instanceof ValidationError) {
      return res.status(400).json(err.message);
    }
    return res.status(500).json(err.message);
  }
};

exports.loadGame = async (req, res) => {
  const { id } = req.params;

  return tryCatch(req, res, async () => await engine.loadGameState(id));
};

exports.newGame = async (req, res) => {
  const { players, auto } = req.body;

  return tryCatch(req, res, async () => {
    const game = await engine.newGame(players);
    logger.info(`New game created with ID ${ game.id }`);

    if (auto) {
      logger.info(`Auto assigning territories for game ID ${ game.id }`);
      await engine.autoAssignTerritories(game);
    }

    return await engine.loadGameState(game.id);
  });
};
