const express = require('express');
const userRouter = require('./user')
const accountRouter = require('./account')
const { authMiddleware } = require('../middleware')
const { User } = require('../db')

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

router.get("/me", authMiddleware, (req, res) => {
    res.status(200).json({
        "msg" : "User is valid"
    });
});

module.exports = router;