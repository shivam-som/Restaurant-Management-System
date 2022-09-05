const dotenv = require('dotenv');
const express  = require('express');
const app = express();

// dotenv line is to use dotenv file functionality in this page
dotenv.config({path:'./config.env'});
// requiring conn file , so it will work as it is 
require('./db/conn');
// using express.json so, i fwe get any data from API in Json form then our app will easily understand it
app.use(express.json());

// const User = require('./model/userSchema');

// linked the router files to make the routing 
app.use(require('./router/auth'));

const PORT = process.env.PORT;

// Middleware -> used for redirect login and signup
const middleware = (req, res, next) => {
    console.log(`Hello middleware`);
    // Program will continue execution after next function
    // middleware runs before the function body in which it was provide
    next();
}

app.get('/', (req, res) => {
    res.send(`Hello world from server`);
});
app.get('/about', middleware, (req, res) => {
    res.send(`Hello world from about`);
});
app.get('/reading-stuff', (req, res) => {
    res.send(`Hello world from reading-stuff`);
});
app.get('/contact', (req, res) => {
    res.send(`Hello world from contact`);
});
app.get('/login', (req, res) => {
    res.send(`Hello world from login`);
});
app.get('/signup', (req, res) => {
    res.send(`Hello world from signup`);
});

app.listen(PORT, () => {
    console.log(`server is running at ${PORT}`);
});
