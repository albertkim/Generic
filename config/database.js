module.exports = {
  production: {
    client: 'mysql',
    connection: {
      host     : '127.0.0.1',
      user     : 'root',
      password : 'password',
      database : 'generic',
      charset  : 'utf8'
    }
  },
  development: {
    client: 'mysql',
    connection: {
      host     : '127.0.0.1',
      user     : 'root',
      password : 'password',
      database : 'generic',
      charset  : 'utf8'
    }
  },
  test: {
    client: 'mysql',
    connection: {
      host     : '127.0.0.1',
      user     : 'root',
      password : 'password',
      database : 'generic',
      charset  : 'utf8'
    }
  }
};