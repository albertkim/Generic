var Bookshelf = require('bookshelf');
var Knex = require('knex');
var config = require('../../config/database');

// TODO: Make this conditional based on NODE_ENV
var knex = Knex(config.development);

// Using this plugin allows us to refer to models from other models by name
// This prevents having to load the models for relationships, which can cause circular dependencies
var bookshelf = Bookshelf(knex);
bookshelf.plugin('registry')

module.exports = bookshelf;