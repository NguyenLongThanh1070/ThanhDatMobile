require("dotenv").config();
const port = process.env.PORT;


const listeningPort = (app) => {
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
}

module.exports = listeningPort;