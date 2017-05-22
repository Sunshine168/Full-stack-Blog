const winston = require('winston');

const logger =  new(winston.Logger)({
  transports: [
    new (winston.transports.Console)({
     json: true,
     colorize: true
   }),
   new winston.transports.File({
     filename: 'logs/success.log'
   })
  ]
})

const errorloger = new(winston.Logger)({
  transports:[
    new (winston.transports.Console)({
     json: true,
     colorize: true
   }),
   new winston.transports.File({
     filename: 'logs/error.log'
   })
  ]
})

module.exports ={
    logger:logger,
    errorloger:errorloger,
}
