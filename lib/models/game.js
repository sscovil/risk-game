'use strict';

const Base = require('./base');

class Game extends Base {
  static get tableName() {
    return 'games';
  }

  static get jsonSchema () {
    return {
      type: 'object',
      required: [
        'id',
        'players'
      ],

      properties: {
        id: {
          type: 'string'
        },

        players: {
          type: 'array',
          items: {
            type: 'string'
          },
          minItems: 3,
          maxItems: 6
        }
      }
    };
  }
}

module.exports = Game;
