const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
        if (err) {
            console.error('Error al verificar el token:', err.message);
            return res.status(403).json({ message: 'Token no válido', error: err.message });
        }
        req.user = decoded;
        next();
    });
};

module.exports = verifyToken;
