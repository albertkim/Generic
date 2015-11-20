var Knex = require('knex');
var config = require('./config/database');
var knex = Knex(config);

module.exports = require('bookshelf')(knex);