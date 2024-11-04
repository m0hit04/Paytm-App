const express = require('express');
const zod = require("zod");
const router = express.Router();
const { User, Account } = require('../db')
const jwt = require("jsonwebtoken");
const { authMiddleware } = require('../middleware')

router.get("/userDetails", authMiddleware, async (req, res) => {
    const user = await User.findOne({_id : req.userId}, ['username', 'firstName', 'lastName']);
    res.json(user);
})


const signUpBody = zod.object({
    username: zod.string().email().min(6).max(30),
    password: zod.string().min(6).max(30),
    firstName: zod.string().max(50),
    lastName: zod.string().max(50),
})

router.post("/signUp", async (req, res) => {
    const response = signUpBody.safeParse(req.body);
    if (!response.success) {
        return res.status(411).send({
            "msg" : "Error while signup"
        })
    }
    const username = req.body.username;    
    const query = await User.find({username});
    
    if (query.length != 0) {     
        return res.status(411).send({
            "msg" : "User already exists"
        });
    }
    const newUser = await User.create({
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName
    });
    const userId = newUser._id;


    await Account.create({
        userId: userId,
        balance: ( Math.random() * 10000 ) + 1
    })

    const token = jwt.sign({userId}, process.env.JWT_SECRET);
    res.status(200).send({
        "message": "User created successfully",
        token
    })
})

const signInBody = zod.object({
    username: zod.string().email().min(6).max(30),
    password: zod.string().min(6).max(30),
});


router.post("/signIn", async (req, res) => {
    const response = signInBody.safeParse(req.body);
    if (!response.success) {
        return res.status(411).send({
            "msg" : "Incorrect inputs!"
        })
    }
    const dbResponse = await User.findOne({
        username: req.body.username,
        password: req.body.password
    });
    if (!dbResponse) {
        return res.status(411).send({
            "msg" : "Error while logging in"
        })
    }
    const userId = dbResponse._id;
    const jwtToken = jwt.sign({userId}, process.env.JWT_SECRET);
    res.send({
        "token": jwtToken
    });
})

const updateBody = zod.object({
    password: zod.string().min(6).max(30).optional(),
    firstName: zod.string().max(50).optional(),
    lastName: zod.string().max(50).optional(),
})

router.put("/", authMiddleware, async (req, res) => {
    const response = updateBody.safeParse(req.body);
    if (!response.success) {
        res.status(411).send({
            "msg" : "Error while updating information"
        })
    }
    if (req.body.username) {
        return res.status(411).send({
            "msg" : "Can't update username"
        })
    }
    const result = await User.updateOne({ _id : req.userId }, req.body);
    res.send({
        "msg" : "Updated successfully"
    })
})

router.get("/bulk", authMiddleware, async (req, res) => {
    const filter = req.query.filter || "";  

    let users = await User.find({
        $or: [{
            firstName: {
                "$regex": filter,
                "$options" : "i"
            }
        }, {
            lastName: {
                "$regex": filter,
                "$options" : "i"
            }
        }]
    })
    
    users = users.filter((user) => {
        return user._id.toString() !== req.userId.toString();
    });
    
    
    res.json({
        users: users.map(user => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

// router.post("/test", authMiddleware, (req, res) => {
//     res.send({
//         "msg" : "Successful"
//     })
// })

module.exports = router;