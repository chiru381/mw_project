const userRoute = require("../controllers/user.api");
const loginRoute = require("../controllers/login.api");
const getusers = require("../controllers/get-users.api");
const validateuser = require("../controllers/validateUser.api");
const updateUser = require("../controllers/updateUser.api");
const forgotPassword = require("../controllers/forgotpassword.api");
const resetPassword = require("../controllers/resetpassword.api");
const changePassword = require("../controllers/changepassword.api");
const deleteUser = require("../controllers/deleteuser.api");

const express = require("express");
const router = express.Router();

router.post("/user", userRoute);
router.post("/login", loginRoute);
router.get("/get-users", getusers);
router.post("/validateUser", validateuser);
router.put("/update-user/:id", updateUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/changePassword/:id", changePassword);
router.delete("/deleteUser/:id", deleteUser);

module.exports = router;
