const cookie = require("cookie-parser");

const cookieParser = (app) => {
    app.use(cookie());
}

module.exports = cookieParser;