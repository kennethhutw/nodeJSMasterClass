const express= require("express");

const router = express.Router();

const controller = require("../controllers/users.controller");
const  auth = require("../middlewares/auth");

router.get("/",auth.verifyToken, controller.getUsers);
router.post("/register", controller.register);
router.post("/login", controller.login);

module.exports = router;