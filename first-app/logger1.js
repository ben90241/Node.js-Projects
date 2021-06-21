const EventEmitter = require("events");
//const emitter = new EventEmitter();

console.log(__filename);

console.log(__dirname);

var url = "http://mylogger.io/log";

class Logger extends EventEmitter
{
  log(message) {
    //send an HTTP request
    console.log(message);

    // raise an event
    this.emit("messageLogged", { id: 1, url: "http://" });
  }
};

// send http request to the endpoint, URL

function logFunction(message) {
  //send an HTTP request
  console.log(message);

  // raise an event
  //emitter.emit('messageLogged', { id: 1, url: 'http://'});
}

// both URL variable and log function they are scoped to this module and both private

// adding a method called log to the export object and simply setting it to the log function declared above
module.exports.logFunction = logFunction;

module.exports.url = url;

module.exports.endPoint = url;