const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const header = req.header('Authorization');
    if (!header) return res.sendStatus(401).json({"message":"missing token"});
    const [bearer,token]=header.split(" ");
    if(bearer != "Bearer" || !token){
        return res.sendStatus(401).json({"message":"incorrect token format"});
    }
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) return res.sendStatus(403).json({"message":"Invalid token"});
        req.user = user;
        next();
    });
};

module.exports=authenticateToken; 