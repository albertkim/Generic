var bunyan = require('bunyan');
var logConfig = require('../../../config/logs');

var logPath = './logs/' + logConfig.name + '.log';

module.exports = bunyan.createLogger({
  name: logConfig.name,
  streams: [
    {
			level: 'debug',
      path: logPath,
    }
   ]
});