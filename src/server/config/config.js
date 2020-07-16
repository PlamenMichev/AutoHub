module.exports = {
    development: {
        port: process.env.PORT || 3001,
        dbUrl: `mongodb+srv://admin:${process.env.DB_PASSWORD}@cubicle-0kjaa.mongodb.net/AutoHub?retryWrites=true&w=majority`,
        auth: 'authentication',
    },
    production: {},
};