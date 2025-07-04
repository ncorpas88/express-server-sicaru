const jwt = require("jsonwebtoken");

function verifyToken(req, res, next) {

    try {
        const tokenText = req.headers.authorization;
        const token = tokenText.split(" ")[1];
        const payload = jwt.verify(token, process.env.TOKEN_SECRET);
        req.payload = payload;
        next();
    } catch (error) {
        res.status(401).json({errorMessage:"Token no valido o no existe"});
    }
}

module.exports = {verifyToken}; 