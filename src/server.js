const express = require("express");
const configViewEngine = require("./configs/viewEngine");
const listeningPort = require("./configs/listeningPort");
const bodyParserMiddleware = require("./middleware/bodyParser");
const cookieParser = require("./configs/cookiesParser");
const sessionConfig = require("./configs/session");
const initAPIRoute = require("./route/api");
const initWebRoute = require("./route/web");
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

const app = express();

configViewEngine(app);
bodyParserMiddleware(app);
cookieParser(app);
sessionConfig(app);
initAPIRoute(app);
initWebRoute(app);
notFound(app);
errorHandlerMiddleware(app);
listeningPort(app);
