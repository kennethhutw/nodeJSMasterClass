const express= require("express");

const router = express.Router();

const controller = require("../controllers/todo.controller");

router.get("/", controller.getData);
router.get("/:id", controller.getDataById);
router.post("/", controller.addTodo);
router.put("/:id", controller.updateTodo);
router.delete("/:id", controller.deleteTodo);

module.exports = router;