import jwt from 'jsonwebtoken';

const secret = 'your-secret-key';

export function generateToken(data) {
    return jwt.sign(data, secret, { expiresIn: '1h' })
}

export function verifyToken(token) {
    return jwt.verify(token, secret);
}

export const authenticate = (handler) => async (req, res) => {
    const token = req?.headers?.authorization?.replace('Bearer ', '')
    if (!token) {
        return res.status(401).json({ msg: 'Unauthorized' });
    }

    try {
        const decodeToken = verifyToken(token);
        req.user = decodeToken;
        return handler(req, res);
    } catch (e) {
        return res.status(401).json({ msg: 'Token is not valid' });
    }
}