const express = require("express");
const apiController = require("../controller/apiController");

let router = express.Router();

const initAPIRoute = (app) => {
    router.get("/products", apiController.getAllProducts);
    router.post("/create-product", apiController.createProduct);
    router.put("/update-product/:id", apiController.updateProduct);
    router.delete("/delete-product/:id", apiController.deleteProduct);
    router.get("/users", apiController.getAllUsers);
    router.post("/create-user", apiController.createUser);
    router.put("/update-user/:userid", apiController.updateUser);
    router.delete("/delete-user/:userid", apiController.deleteUser);
    return app.use("/api/v1/", router);
};

module.exports = initAPIRoute;
