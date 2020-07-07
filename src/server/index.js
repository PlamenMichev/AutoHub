const env = process.env.NODE_ENV || "development";

const usersRoute = require('./routes/users');

const app = require('express')();
const config = require('./config/config')[env];
require('dotenv').config();

app.use('/users', usersRoute);

app.listen(config.port, console.log(`Server is up and listening on port ${config.port}.`));