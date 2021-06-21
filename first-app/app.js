function sayHello(name)
{
    console.log('Hello '+ name + '!');
}

var sayHello_2 = function()
{

}

sayHello('Benson');
//console.log(module);

// "./" indicates the current folder
// to load the module, we use require function
// usually we set it to a constant to avoid overwrite and further exception in your code

/*var logger = require('./logger.js');

console.log(logger);*/

var logger = require('./logger1');

logger.logFunction('Message here!!!');

const logger2 = require('./logger1');

logger2.logFunction('Message here 2!!!')

const path = require('path');
var pathObj = path.parse(__filename);

console.log(pathObj);

const os = require('os');

var totalMem = os.totalmem();

var freeMem = os.freemem();

console.log('Total Memory: '+ totalMem);

//Template String
//ES6 /ES2015 : ECMAScript 6

console.log(`Total Memory: ${totalMem}`);
console.log(`Free Memory: ${freeMem}`);

//node process has a single thread, avoid using synchronous methods
// always use asynchronous methods
const fs = require('fs');

//const files = fs.readdirSync('./');
//console.log(files);

fs.readdir('$', function(err, files){
    if(err) console.log('Error', err);
    else console.log('Result', files);
});

// module HTTP, provide web service by listen on a given port
// whenever receive a request on the port, that HTTP class raise an event
// naming convention, when declare all words in capital, it means this is a "Class" not function or variable
const EventEmitter = require('events');
const emitter = new EventEmitter();

// emit, making noise or produce something
// raise an event
// on method is the same as addListener method, but on is usually used
emitter.on('messageLogged', function(arg) //e, eventArg
{
    console.log('Listener called!', arg);
});

//emitter.emit('messageLogged', { id: 1, url: 'http://'});

// Assignment, Raise: logging (data: message)
const Logger = require('./logger');

const logger3 = new Logger;

logger3.on('messageLogged', function(arg) //e, eventArg
{
    console.log('Listener called!', arg);
});

logger3.log('message');