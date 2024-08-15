const User = require('../models/userModel');
const Login = require('../models/loginModel');


router.post('/', async (req, res) => {
    try {
        // Validaciones
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            return sendResponse(res, 404, {}, 'Correo o contraseña incorrectos.');
        }

        if (user.isBlocked) {
            return sendResponse(res, 401, {}, 'El usuario está bloqueado. No puede iniciar sesión');
        }

        if (!user.isVerified) {
            return sendResponse(res, 401, {}, 'El usuario no ha verificado su cuenta. No puede iniciar sesión');
        }

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if (!validPassword) {
            return sendResponse(res, 400, {}, 'Correo o contraseña incorrectos.');
        }

        const tokenExpirationSeconds = 3600; 
        const token = jwt.sign(
            { _id: user._id },
            process.env.TOKEN_SECRET,
            { expiresIn: tokenExpirationSeconds }
        );

        const expirationDate = new Date(new Date().getTime() + tokenExpirationSeconds * 1000);

        sendResponse(res, 200, { token, expiration: expirationDate.toISOString() }, 'Inicio de sesión exitoso');
    } catch (error) {
        console.error(error);
        sendResponse(res, 500, {}, 'Error interno del servidor');
    }
});

module.exports = router;