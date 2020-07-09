const env = process.env.NODE_ENV || "development";

const usersRouter = require('./routes/users');
const carsRouter = require('./routes/cars');
const makesRouter = require('./routes/makes');
const modelsRouter = require('./routes/models');
const cron = require("node-cron");

const app = require('express')();
const bodyParser = require('body-parser');
const config = require('./config/config')[env];
const { fetchMakes, fetchModels } = require('./utils/cron-jobs');
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/users', usersRouter);
app.use('/cars', carsRouter);
app.use('/makes', makesRouter);
app.use('/models', modelsRouter);

app.get('*', (req, res) => {
    res
        .status(404)
        .json({
            message: 'Not Found!',
        });
})

cron.schedule("10 * * * 7", async function() {
    await fetchMakes();
});

cron.schedule("30 * * * 7", async function() {
    await fetchModels();
});


app.listen(config.port, console.log(`Server is up and listening on port ${config.port}.`));