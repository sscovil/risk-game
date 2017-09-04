'use strict';

const _ = require('lodash');
const config = require('config');
const Knex = require('knex');
const objection = require('objection');
const uuid = require('node-uuid');

const camelCase = _.memoize(_.camelCase);
const knex = Knex(config.get('knex'));
const Model = objection.Model;
const snakeCase = _.memoize(_.snakeCase);

Model.knex(knex);

class Base extends Model {
  /**
   * This is called before performing an INSERT.
   */
  $beforeInsert() {
    this.id = uuid.v4();
    this.createdAt = new Date().toISOString();
    this.updatedAt = new Date().toISOString();
  }

  /**
   * This is called before performing an UPDATE.
   */
  $beforeUpdate() {
    this.updatedAt = new Date().toISOString();
  }

  /**
   * This is called when an object is serialized to database format.
   */
  $formatDatabaseJson(json) {
    json = super.$formatDatabaseJson(json);

    return _.mapKeys(json, (value, key) => snakeCase(key));
  }

  /**
   * This is called when an object is read from database.
   */
  $parseDatabaseJson(json) {
    /**
     * Note that even though column names are mapped when fetching / storing data,
     * one still has to use db column names when writing queries. For example:
     *
     * await Person.query().insert({ firstName: 'Jennifer' });
     * let jen = await Person.query().where('first_name', 'Jennifer');
     * expect(jen.firstName).to.equal('Jennifer');
     */
    json = _.mapKeys(json, (value, key) => camelCase(key));

    return super.$parseDatabaseJson(json);
  }
}

module.exports = Base;
