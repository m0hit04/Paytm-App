const express = require('express');
const userRouter = require('./user')
const accountRouter = require('./account')
const { authMiddleware } = require('../middleware')
const { User } = require('../db')

const router = express.Router();

router.use("/user", userRouter);
router.use("/account", accountRouter);

router.get("/me", authMiddleware, async (req, res) => {
    const user = await User.findOne({_id : req.userId}, ['_id', 'username', 'firstName', 'lastName']);
    res.json(user);
})

module.exports = router;