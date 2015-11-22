var bookshelf = require('./bookshelf');
var User = require('./User');

module.exports = bookshelf.Model.extend({
  tableName: 'authToken',
  userId: function() {
    return this.belongsTo(User);
  }
});