const notFound = (req, res) => res.status(404).send("Route does not exist");

const notFoundMiddleware = (app) => {
    app.use(notFound);
}

module.exports = notFoundMiddleware;
