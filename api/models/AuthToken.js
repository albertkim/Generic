var bookshelf = require('./bookshelf');
var User = require('./User');

module.exports = bookshelf.model('AuthToken', {
  tableName: 'authToken',
  user: function() {
    return this.belongsTo('User', 'userId');
  }
});