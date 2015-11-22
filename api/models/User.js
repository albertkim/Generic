var bookshelf = require('./bookshelf');

module.exports = bookshelf.model('User', {
  tableName: 'user',
  authTokens: function() {
     return this.hasMany('AuthToken');
  }
});