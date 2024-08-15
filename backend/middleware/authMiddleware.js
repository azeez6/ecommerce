// backend/middleware/authMiddleware.js
const jwt = require('jsonwebtoken');



const authMiddleware = (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error(err);
        res.status(401).json({ message: 'Invalid token' });
    }
};

const verifyAdmin = async (req, res, next) => {
    const token = req.cookies.token;

    if (token) {
        jwt.verify(token, 'secret', async (err, decodedToken) => {
            if (err) {
                res.status(401).json({ message: 'Unauthorized' });
            } else {
                const user = await User.findById(decodedToken.id);
                if (user && user.role === 'admin') {
                    req.userId = decodedToken.id;
                    next();
                } else {
                    res.status(403).json({ message: 'Forbidden' });
                }
            }
        });
    } else {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

module.exports = authMiddleware, verifyAdmin;
