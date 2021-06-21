//const { Socket } = require('dgram');
const http = require('http');

const server = http.createServer((req, res) => {

    //this if structure is not actually maintainable as we define more routes for the application
    // we need to add more if blocks in this callback function

    // we will need framework to give the application a proper structure, Express!
    if(req.url === '/'){
        res.write('Hello World');
        res.end();
    }

    if(req.url ==='/api/courses')
    {
        res.write(JSON.stringify([1,2,3]));
        res.end();
    }
});

/*server.on('connection', (socket)=>{
    console.log('New connection...');
});*/

server.listen(3000);

console.log('Listening on port 3000...');