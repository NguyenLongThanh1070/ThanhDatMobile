const { PrismaClient } = require("@prisma/client");
const { redisGet, redisSet } = require("../configs/redisGetSet");
const asyncWrapper = require("../middleware/async");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const prisma = new PrismaClient();

//home
let getHomePage = asyncWrapper(async (req, res) => {
    let products = await redisGet();
    if (products.length == 0) {
        await redisSet();
        products = await redisGet();
    }
    return res.render("trangchu.ejs", {
        products,
        username: req.session.username,
        status: "",
    });
});

//dang ky
let getDangKyPage = (req, res) => {
    return res.render("dangky.ejs", {
        status: "",
    });
};

let postNewUser = asyncWrapper(async (req, res) => {
    let { name, username, email, password } = req.body;
    let checkUser = await prisma.users.findMany({
        where: {
            user_name: username,
            email: email,
        },
    });
    if (checkUser[0] == undefined) {
        await prisma.users.create({
            data: {
                name: name,
                email: email,
                user_name: username,
                password: password,
            },
        });
        return res.render("dangnhap.ejs", {
            status: "Tạo tài khoản thành công, xin mời đăng nhập",
        });
    } else {
        return res.render("dangky.ejs", {
            status: "Tên đăng nhập đã tồn tại",
        });
    }
});

//dang nhap
let getDangNhapPage = (req, res) => {
    return res.render("dangnhap.ejs", {
        status: "",
    });
};

let userLogIn = asyncWrapper(async (req, res) => {
    let { username, password } = req.body;
    let checkUser = await prisma.users.findMany({
        where: {
            user_name: username,
            password: password,
        },
    });
    if (checkUser[0] == undefined) {
        return res.render("dangnhap.ejs", {
            status: "Tên đăng nhập không tồn tại",
        });
    } else {
        req.session.loggedin = true;
        req.session.username = username;
        const token = jwt.sign({ username: username, password: password }, process.env.JWT_SECRET, {
            expiresIn: "15m",
        });
        res.cookie("token", token, {
            secure: true,
        });
        return res.redirect("/");
    }
});

let userLogout = asyncWrapper((req, res) => {
    req.session.destroy();
    return res.redirect("/");
});

//quen mk
let getQuenMK = (req, res) => {
    return res.render("quenmk.ejs", {
        status: "",
    });
};

let quenmk = asyncWrapper(async (req, res) => {
    let { email } = req.body;
    let checkUser = await prisma.users.findMany({
        where: {
            email: email,
        },
    });
    if (checkUser[0] == undefined) {
        return res.render("quenmk.ejs", {
            status: "Người dùng không tồn tại",
        });
    } else {
        let mailTransporter = nodemailer.createTransport({
            service: "gmail",
            port: 465,
            secure: true,
            secureConnection: false,
            auth: {
                user: process.env.USERNAME,
                pass: process.env.PASSWORD,
            },
            tls: {
                rejectUnauthorized: true,
            },
        });
        let details = {
            from: "Contact Support <nguyenlongthanhIT@gmail.com>",
            to: email,
            subject: "Lấy lại mật khẩu bởi Thành Đạt Mobile",
            text: `Đây là tên đăng nhập của bạn: ${checkUser[0].user_name}, mật khẩu của bạn: ${checkUser[0].password}`,
        };
        mailTransporter.sendMail(details);
        return res.render("dangnhap.ejs", {
            status: "Kiểm tra mail và xin mời đăng nhập",
        });
    }
});

//danh muc san pham
let getDanhMucSanPhamPage = asyncWrapper(async (req, res) => {
    let products = await redisGet();
    if (products.length < 8) {
        await redisSet();
        products = await redisGet();
    }
    return res.render("danhmucsanpham.ejs", {
        products,
        status: "",
        username: req.session.username,
    });
});

//gio hang
let getGioHangPage = asyncWrapper(async (req, res) => {
    let carts = await prisma.carts.findMany({
        where: {
            username: req.session.username,
            paid: "no",
        },
    });
    let price = carts.reduce((accumulator, current) => {
        return accumulator + current.quantity * Number(current.price);
    }, 0);
    let shipping = carts.length == 0 ? 0 : 20000;
    let total = price + shipping;
    return res.render("giohang.ejs", {
        carts,
        price,
        shipping,
        total,
        username: req.session.username,
    });
});
let add_to_cart = asyncWrapper(async (req, res) => {
    let { id, images, name, price, quantity, username } = req.body;
    id = Number(id);
    quantity = Number(quantity);
    await prisma.carts.create({
        data: {
            id: id,
            images: images,
            name: name,
            price: price,
            quantity: quantity,
            username: username,
            paid: "no",
        },
    });
    let products = await redisGet();
    if (products.length == 0) {
        await redisSet();
        products = await redisGet();
    }
    return res.render("danhmucsanpham.ejs", {
        products,
        status: "Thêm vào giỏ hàng thành công",
        username: req.session.username,
    });
});
let remove_from_cart = asyncWrapper(async (req, res) => {
    let { cartID } = req.body;
    cartID = Number(cartID);
    await prisma.carts.delete({
        where: {
            cartID: cartID,
        },
    });
    return res.redirect("/giohang");
});

//gioi thieu
let getGioiThieuPage = (req, res) => {
    return res.render("gioithieu.ejs", { username: req.session.username });
};

//lien he
let getLienHePage = (req, res) => {
    return res.render("lienhe.ejs", { username: req.session.username });
};

let phanhoi = asyncWrapper(async (req, res) => {
    let { name, email, phone, message } = req.body;
    await prisma.feedback.create({
        data: {
            name: name,
            email: email,
            phone: phone,
            message: message,
        },
    });
    let products = await redisGet();
    if (products.length == 0) {
        await redisSet();
        products = await redisGet();
    }
    return res.render("trangchu.ejs", {
        products,
        username: req.session.username,
        status: "Cảm ơn bạn đã phản hồi",
    });
});

//single san pham
let getTrangSanPhamChiTietPage = asyncWrapper(async (req, res) => {
    let productId = parseInt(req.params.productId);
    let products = await redisGet();
    if (products.length == 0) {
        await redisSet();
        products = await redisGet();
    }
    const productDetail = await products.find((product) => product.id == productId);
    return res.render("trangsanphamchitiet.ejs", {
        productDetail,
        products,
        username: req.session.username,
    });
});

//thanh toan
let thanhtoan = asyncWrapper(async (req, res) => {
    let { price, address, phone, username } = req.body;
    if (address == "" || phone == "") {
        return res.redirect("/giohang");
    }
    await prisma.bill.create({
        data: {
            price: price,
            address: address,
            phone: phone,
            username: username,
            paid: "no",
        },
    });
    let bill = await prisma.bill.findMany({
        where: {
            username: username,
            paid: "no",
        },
    });
    let cart = await prisma.carts.findMany({
        where: {
            username: username,
            paid: "no",
        },
    });
    for (let i = 0; i < cart.length; i++) {
        await prisma.billDetails.create({
            data: {
                billID: bill[0].billID,
                productName: cart[i].name,
                quantity: cart[i].quantity,
                price: cart[i].price,
            },
        });
    }
    await prisma.bill.updateMany({
        where: {
            username: username,
            paid: "no",
        },
        data: {
            paid: "yes",
        },
    });
    await prisma.carts.updateMany({
        where: {
            username: username,
            paid: "no",
        },
        data: {
            paid: "yes",
        },
    });
    let products = await redisGet();
    if (products.length == 0) {
        await redisSet();
        products = await redisGet();
    }
    return res.render("trangchu.ejs", {
        products,
        username: req.session.username,
        status: "Cảm ơn bạn đã mua hàng",
    });
});

//tim kiem
let timkiem = asyncWrapper(async (req, res) => {
    let search = req.query.search.toLowerCase();
    let products = await redisGet();
    if (products.length == 0) {
        await redisSet();
        products = await redisGet();
    }
    products = await products.filter((product) => product.name.toLowerCase().includes(search));
    return res.render("danhmucsanpham.ejs", {
        products,
        status: `Tìm thấy ${products.length} sản phẩm`,
        username: req.session.username,
    });
});

module.exports = {
    getHomePage,
    getDangKyPage,
    postNewUser,
    getDangNhapPage,
    userLogIn,
    userLogout,
    getQuenMK,
    quenmk,
    getDanhMucSanPhamPage,
    getGioHangPage,
    add_to_cart,
    remove_from_cart,
    getGioiThieuPage,
    getLienHePage,
    phanhoi,
    getTrangSanPhamChiTietPage,
    thanhtoan,
    timkiem,
};
