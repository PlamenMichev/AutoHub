const env = process.env.NODE_ENV || "development";
require('dotenv').config();

const usersRouter = require('./routes/users');
const makesRouter = require('./routes/makes');
const modelsRouter = require('./routes/models');
const adsRouter = require('./routes/ads');
const searchRouter = require('./routes/search');
const cron = require("node-cron");

const cors = require('cors');
const app = require('express')();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config/config')[env];
const { fetchMakes, fetchModels } = require('./utils/cron-jobs');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({
    exposedHeaders: config.auth,
}));

mongoose.connect(config.dbUrl, { useNewUrlParser: true, useUnifiedTopology: true } ,(err) => {
    if (err) {
        throw err;
    }

    console.log('Db is connected!');
});

app.use('/users', usersRouter);
app.use('/makes', makesRouter);
app.use('/models', modelsRouter);
app.use('/ads', adsRouter);
app.use('/search', searchRouter);

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