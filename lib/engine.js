'use strict';

const Game = require('./models/game');

exports.autoAssignTerritories = (game) => {
  return Promise.resolve(); // TODO: Automatically assign territories to players.
};

exports.loadGameState = (id) => {
  return Game
    .query()
    .where('id', id);
};

exports.newGame = (players) => {
  return Game
    .query()
    .insert({
      players: players,
      currentTurn: 1,
      cardSetsTraded: 0
    });
};
