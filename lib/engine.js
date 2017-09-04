'use strict';

const Game = require('./models/game');

exports.autoAssignTerritories = (game) => {
  // TODO: Automatically assign territories to players.
};

exports.loadGame = (id) => {
  // TODO: Load game with a given ID.
};

exports.newGame = (players, auto = false) => {
  // TODO: Validate that players is an array of 3-6 player names (strings)

  // TODO: If auto is true, randomly assign territories to all players

  // TODO: Generate a new game by creating a record in the database
};
