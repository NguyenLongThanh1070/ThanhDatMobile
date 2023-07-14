require("dotenv").config();
const jwt = require("jsonwebtoken");
const asyncWrapper = require("./async");

const cookieJWTAuth = asyncWrapper((req,res,next) => {
    const token = req.cookies.token;
    try {
        const user = jwt.verify(token,process.env.JWT_SECRET);
        req.user = user;
        next();
    } catch (error) {
        res.clearCookie("token");
        return res.redirect("/");
    }
});

module.exports = cookieJWTAuth;
