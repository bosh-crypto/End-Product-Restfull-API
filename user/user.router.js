const { createUser, getUsers , getUsersByUserId ,UpdateUser, deleteUser , login} = require("./user.controller");
const router = require("express").Router();
const { checktoken } = require ("../auth/token_validation")


router.post("/" ,checktoken, createUser);
router.get("/",checktoken,getUsers);
router.get("/:id",checktoken, getUsersByUserId);
router.patch("/",checktoken, UpdateUser);
router.delete("/delete",checktoken, deleteUser)
router.post("/login",login);


module.exports = router;
