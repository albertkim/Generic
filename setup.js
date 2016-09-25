// Reference: https://medium.com/@rafaelvidaurre/managing-environment-variables-in-node-js-2cb45a55195f#.q6jvjy9wv

'use strict'
const fs = require('fs')
fs.createReadStream('.sample-env')
  .pipe(fs.createWriteStream('.env'))
