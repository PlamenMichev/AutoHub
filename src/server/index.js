const env = process.env.NODE_ENV || "development";

const usersRouter = require('./routes/users');
const carsRouter = require('./routes/cars');
const cron = require("node-cron");

const app = require('express')();
const config = require('./config/config')[env];
require('dotenv').config();

app.use('/users', usersRouter);
app.use('/cars', carsRouter);

app.get('*', (req, res) => {
    res
        .status(404)
        .json({
            message: 'Not Found!',
        });
})

cron.schedule("* * * * 7", function() {
    console.log("running a task every minute");
  });

app.listen(config.port, console.log(`Server is up and listening on port ${config.port}.`));