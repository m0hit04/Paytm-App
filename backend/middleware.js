const jwt = require("jsonwebtoken")

const authMiddleware = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(403).send({
            "msg" : "Not an authenticated user"
        })
    }
    const extractedToken = token.split(' ')[1];
    try {
        const jwtResponse = jwt.verify(extractedToken, process.env.JWT_SECRET);
        req.userId = jwtResponse.userId;
        next();
    } catch(err) {
        return res.status(403).send({
            "msg" : "Not a valid token"
        })
    }
}

module.exports = {
    authMiddleware
}