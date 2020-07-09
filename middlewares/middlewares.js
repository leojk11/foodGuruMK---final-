const jwt = require('jsonwebtoken');
require('dotenv/config');

const domainName = 'http://localhost:3000';

verifyToken = (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, process.env.SECRET);
        req.username = decoded;
        // console.log(req.username);
        next();
    } catch (error) {
        // console.log(error);
        // console.log(req.cookies)
        res.redirect(domainName + '/carrier');
        res.status(401).json({
            message: 'Please log in/register first!'
        });

    }
};

verifyTokenAdmin = (req, res, next) => {
    try {
        const token = req.cookies.access_token;
        const decoded = jwt.verify(token, process.env.SECRET);
        req.username = decoded;
        // console.log(req.username);
        next();
    } catch (error) {
        // console.log(error);
        // console.log(req.cookies)
        res.redirect(domainName + '/superadmin')
        res.status(401).json({
            message: 'Please log in/register first!'
        });

    }
};

verifyTokenRestaurant = (req, res, next) => {
    try {
        const token = req.cookies.restlg;
        const decoded = jwt.verify(token, process.env.SECRET);
        req.username = decoded;
        // console.log(req.username);
        next();
    } catch (error) {
        // console.log(error);
        // console.log(req.cookies);
        res.redirect(domainName + '/restaurants')
        res.status(401).json({
            message: 'Please log in/register first!'
        });

    }
};

verifyTokenClients = (req, res, next) => {
    try {
        const token = req.cookies.cliAct;
        const decoded = jwt.verify(token, process.env.SECRET);
        req.username = decoded;
        // console.log(req.username);
        next();
    } catch (error) {
        // console.log(error);
        // console.log(req.cookies);
        res.redirect(domainName + '/');
        res.status(401).json({
            message: 'Please log in/register first!'
        });

    }
};

// verifyToken = (req, res, next) => {
//     try {
//         const bearerHeader = req.headers['authorization'];
//         if(typeof bearerHeader !== 'undefined') {

//         } else {
//             res.sendStatus(403);
//         }
//     } catch (error) {
        
//     }
// }

module.exports = {
    verifyToken,
    verifyTokenAdmin,
    verifyTokenRestaurant,
    verifyTokenClients
}
