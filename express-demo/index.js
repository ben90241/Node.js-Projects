

const Joi = require('joi');
const express = require('express');

const app = express();

app.use(express.json());

const courses = [
    {id: 1, name: 'Data Mining'},
    {id: 2, name: 'Machine Learning'},
    {id: 3, name: 'Software Engineering 101'},
];

app.get('/', (req, res) => {
    res.send('Hello World!!!');
});

app.get('/api/courses', (req, res) => {
    res.send(courses);
});

app.post('/api/courses', (req, res) => 
{
    /*
    //joi module can help to define the schema to check if the body input meets the requirements
    const schema = 
    {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema);
    //console.log(result);

    if(result.error)
    {
        //res.status(400).send(result.error);
        res.status(400).send(result.error.details[0].message);
        return;
    }*/

    const { error } = validateCourse(req.body);
    if(error)
    {
        //res.status(400).send(result.error);
        res.status(400).send(error.details[0].message);
        return;
    }

    /*if(!req.body.name || req.body.name.length<3)
    {
        //400 bad request
        res.status(400).send('Name is required and should be minimum 3 character.');
        return;
    }*/
    const course = {
        id: courses.length+1,
        name: req.body.name,
    };

    courses.push(course);
    res.send(course);
});

app.put('/api/courses/:id', (req, res) => 
{
    //look up the course
    //if not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // status 404, object not exists
    if(!course) res.status(404).send('The course with the given ID was not found.');

    //validate
    //if invalid, return 400 - bad request

    //object destructuring
    //const result = validateCourse(req.body);
    const { error } = validateCourse(req.body);
    if(error)
    {
        //res.status(400).send(result.error);
        return res.status(400).send(error.details[0].message);
        //return;
    }

    //update course
    //return the updated course
    course.name = req.body.name;
    res.send(course);
});

function validateCourse(course)
{
    const schema = 
    {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(course, schema);
};

app.delete('/api/courses/:id', (req, res) => {
    //look up the courses
    //not existing, return 404
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // status 404, object not exists
    if(!course) res.status(404).send('The course with the given ID was not found.');

    //delete
    const index = courses.indexOf(course);
    courses.splice(index, 1);

    //return the same course
    res.send(course);
});

/*app.get('/api/courses/:id', (req, res) => {
    res.send(req.params.id);
});*/

app.get('/api/courses/:id', (req, res) => {
    //res.send(req.query);
    const course = courses.find(c => c.id === parseInt(req.params.id));
    // status 404, object not exists
    if(!course) res.status(404).send('The course with the given ID was not found.');
    res.send(course);
});

app.get('/api/posts/:year/:month',(req, res) =>
{
    res.send(req.params);
});

//localhost:port/api/posts/2021/06?sortBy=name
app.get('/api/posts/:year/:month', (req, res) =>
{
    res.send(req.query);
});

// PORT
const port = process.env.PORT || 3000;

app.listen(port, () => {console.log('Listening on port ${port}...')});