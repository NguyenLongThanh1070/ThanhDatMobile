const session = require("express-session");

const sessionConfig = (app) => {
    app.use(
        session({
            secret: "secret",
            resave: false,
            saveUninitialized: true,
        })
    );
};

module.exports = sessionConfig;
