const { PrismaClient } = require("@prisma/client");
const asyncWrapper = require("../middleware/async");
const { createCustomError } = require("../errors/custom-error");

const prisma = new PrismaClient();

//products
let getAllProducts = asyncWrapper(async (req, res, next) => {
    let products = await prisma.products.findMany({});
    if (products[0] == undefined) {
        return next(createCustomError("Thiếu dữ liệu", 404));
    }
    return res.status(200).json({ message: "ok", products });
});

let createProduct = asyncWrapper(async (req, res, next) => {
    let { images, name, price, resolution, os, frontcam, backcam, ram, rom, pin, quantity } = req.body;
    if (
        !images ||
        !name ||
        !price ||
        !resolution ||
        !os ||
        !frontcam ||
        !backcam ||
        !ram ||
        !rom ||
        !pin ||
        !quantity
    ) {
        return next(createCustomError("Thiếu dữ liệu", 404));
    }
    let product = await prisma.products.findMany({
        where: {
            name: name,
        },
    });
    if (product[0] == undefined) {
        await prisma.products.create({
            data: {
                images: images,
                name: name,
                price: price,
                resolution: resolution,
                os: os,
                frontcam: frontcam,
                backcam: backcam,
                ram: ram,
                rom: rom,
                pin: pin,
                quantity: quantity,
            },
        });
        product = await prisma.products.findMany({
            where: {
                name: name,
            },
        });
        return res.status(200).json({
            message: "ok",
            product,
        });
    } else {
        return next(createCustomError("Sản phẩm đã tồn tại", 404));
    }
});

let updateProduct = asyncWrapper(async (req, res, next) => {
    let id = Number(req.params.id);
    let { images, name, price, resolution, os, frontcam, backcam, ram, rom, pin, quantity } = req.body;
    if (
        !id ||
        !images ||
        !name ||
        !price ||
        !resolution ||
        !os ||
        !frontcam ||
        !backcam ||
        !ram ||
        !rom ||
        !pin ||
        !quantity
    ) {
        return next(createCustomError("Thiếu dữ liệu", 404));
    }
    let product = await prisma.products.findMany({
        where: {
            id: id,
        },
    });
    if (product[0]) {
        await prisma.products.update({
            data: {
                images: images,
                name: name,
                price: price,
                resolution: resolution,
                os: os,
                frontcam: frontcam,
                backcam: backcam,
                ram: ram,
                rom: rom,
                pin: pin,
                quantity: quantity,
            },
            where: {
                id: id,
            },
        });
        product = await prisma.products.findMany({
            where: {
                id: id,
            },
        });
        return res.status(200).json({
            message: "ok",
            product,
        });
    } else {
        return next(createCustomError("Sản phẩm không tồn tại", 404));
    }
});

let deleteProduct = asyncWrapper(async (req, res, next) => {
    let id = Number(req.params.id);
    if (!id) {
        return next(createCustomError("Thiếu dữ liệu", 404));
    }
    let product = await prisma.products.findMany({
        where: {
            id: id,
        },
    });
    if (product[0]) {
        await prisma.products.delete({
            where: {
                id: id,
            },
        });
        return res.status(200).json({
            message: "ok",
            product,
        });
    } else {
        return next(createCustomError("Sản phẩm không tồn tại", 404));
    }
});

//users
let getAllUsers = asyncWrapper(async (req, res, next) => {
    let users = await prisma.users.findMany({});
    if (users[0] == undefined) {
        return next(createCustomError("Thiếu dữ liệu", 404));
    }
    return res.status(200).json({
        message: "ok",
        users,
    });
});

let createUser = asyncWrapper(async (req, res, next) => {
    let { name, email, user_name, password } = req.body;
    if (!name || !email || !user_name || !password) {
        return next(createCustomError("Thiếu dữ liệu", 404));
    }
    let user = await prisma.users.findMany({
        where: {
            email: email,
        },
    });
    if (user[0] == undefined) {
        await prisma.users.create({
            data: {
                name: name,
                email: email,
                user_name: user_name,
                password: password,
            },
        });
        user = await prisma.users.findMany({
            where: {
                email: email,
            },
        });
        return res.status(200).json({
            message: "ok",
            user,
        });
    } else {
        return next(createCustomError("Người dùng đã tồn tại", 404));
    }
});

let updateUser = asyncWrapper(async (req, res, next) => {
    let userid = Number(req.params.userid);
    let { name, email, user_name, password } = req.body;
    if (!name || !email || !user_name || !password) {
        return next(createCustomError("Thiếu dữ liệu", 404));
    }
    let user = await prisma.users.findMany({
        where: {
            userid: userid,
        },
    });
    if (user[0]) {
        await prisma.users.update({
            data: {
                name: name,
                email: email,
                user_name: user_name,
                password: password,
            },
            where: {
                userid: userid,
            },
        });
        user = await prisma.users.findMany({
            where: {
                userid: userid,
            },
        });
        return res.status(200).json({
            message: "ok",
            user,
        });
    } else {
        return next(createCustomError("Người dùng không tồn tại", 404));
    }
});

let deleteUser = asyncWrapper(async (req, res, next) => {
    let userid = Number(req.params.userid);
    if (!userid) {
        return next(createCustomError("Thiếu dữ liệu", 404));
    }
    let user = await prisma.users.findMany({
        where: {
            userid: userid,
        },
    });
    if (user[0]) {
        await prisma.users.delete({
            where: {
                userid: userid,
            },
        });
        return res.status(200).json({
            message: "ok",
            user,
        });
    } else {
        return next(createCustomError("Người dùng không tồn tại", 404));
    }
});

module.exports = {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    getAllUsers,
    createUser,
    updateUser,
    deleteUser,
};
