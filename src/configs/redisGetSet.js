const { PrismaClient } = require("@prisma/client");
const { pool, client } = require("../configs/connectDB");

const prisma = new PrismaClient();

const redisGet = async () => {
    await client.connect();
    let dataCached = await client.get("products");
    dataCached = JSON.parse(dataCached);
    await client.disconnect();
    return dataCached;
};
const redisSet = async () => {
    await client.connect();
    let products = await prisma.products.findMany({});
    products = JSON.stringify(products);
    await client.set("products", products);
    await client.disconnect();
    return console.log("product cached");
};

module.exports = { redisGet, redisSet };
