const express = require("express");
const homeController = require("../controller/homeController");
const cookieJWTAuth = require("../middleware/cookieJWTAuth");

let router = express.Router();

const initWebRoute = (app) => {
    //home
    router.get("/", homeController.getHomePage);
    //dang ky
    router.get("/dangky", homeController.getDangKyPage);
    router.post("/createNewUser", homeController.postNewUser);
    //dang nhap
    router.get("/dangnhap", homeController.getDangNhapPage);
    router.post("/auth", homeController.userLogIn);
    router.get("/dangxuat", homeController.userLogout);
    //quen mk
    router.get("/quenmk", homeController.getQuenMK);
    router.post("/laylaimatkhau", homeController.quenmk);
    //danh muc san pham
    router.get("/danhmucsanpham", homeController.getDanhMucSanPhamPage);
    //gio hang
    router.get("/giohang", homeController.getGioHangPage);
    router.post("/add_to_cart", homeController.add_to_cart);
    router.post("/remove_from_cart", homeController.remove_from_cart);
    //gioithieu
    router.get("/gioithieu", homeController.getGioiThieuPage);
    //lien he
    router.get("/lienhe", homeController.getLienHePage);
    router.post("/phanhoi", homeController.phanhoi);
    //single san pham
    router.get("/trangsanphamchitiet/:productId", homeController.getTrangSanPhamChiTietPage);
    //thanh toan
    router.post("/thanhtoan", cookieJWTAuth, homeController.thanhtoan);
    //tim kiem
    router.get("/timkiem", homeController.timkiem);
    return app.use("/", router);
};

module.exports = initWebRoute;
