const SnakeNamingStrategy = require('typeorm-naming-strategies')
  .SnakeNamingStrategy;

module.exports = [{
  "name": "default",
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "0000",
  "database": "schema",
  "entities": [
    __dirname + "/out/models/**/*.js"
  ],
  namingStrategy: new SnakeNamingStrategy(),
  logging: ["query", "error"]
}, {
  "name": "prod",
  "type": "mysql",
  "host": "localhost",
  "port": 3306,
  "username": "root",
  "password": "0000",
  "database": "schema",
  "entities": [
    __dirname + "/out/models/**/*.js"
  ],
  namingStrategy: new SnakeNamingStrategy(),
  logging: ["query", "error"]
},]