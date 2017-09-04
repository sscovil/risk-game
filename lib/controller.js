'use strict';

const engine = require('./engine');
const logger = require('winston');
const objection = require('objection');

const ValidationError = objection.ValidationError;

exports.loadGame = (req, res) => {
  // TODO: Load game with a given ID.
};

exports.newGame = async (req, res) => {
  const { players, auto } = req.body;

  try {
    const game = await engine.newGame({ players });
    logger(`New game created with ID ${ game.id }`);
    if (auto) {
      logger(`Auto assigning territories for game ID ${ gameId }`);
      await engine.autoAssignTerritories(game);
    }
    // TODO: Fetch game state.
    return res.json(game);
  }
  catch(err) {
    if (err instanceof ValidationError) {
      return res.status(400).json(err.message);
    }
    return res.status(500).json(err.message);
  }
};
