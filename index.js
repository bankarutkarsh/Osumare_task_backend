const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./Routes/routes.js');

const app = express();
app.use(bodyParser.json());


app.use('/', routes);

const PORT = 5500;
const hostname = 'localhost';

app.listen(PORT,hostname,()=>{
    console.log(`Server is running at ${hostname}: ${PORT}`);
});