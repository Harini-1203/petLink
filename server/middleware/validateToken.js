const jwt = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    
    const token = req.headers['authorization']?.split(' ')[1]; 
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        console.log("validateToken",req.user.user.id); 
        next();
        
    } catch (err) {
        return res.status(401).send('User is not authorized');
    }
    // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    //     if (err) return res.status(403).json({"message":"user is not authorized"}); // Token is no longer valid
    //     req.user = user;
    //     console.log("id"+" "+user);
    //      // Attach user info to the request
    //     next();
    // });

};

module.exports = validateToken;
