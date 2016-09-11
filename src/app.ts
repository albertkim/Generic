/// <reference path="../typings/index.d.ts"/>

import {Server} from './Server'

const server = new Server({
  port: 80
})

server.run()
