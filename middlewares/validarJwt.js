const jwt = require('jsonwebtoken');
const ValidateJwt = (req, res, next) => {
    //leer el token
    const token = req.header('x-token');
    // console.log(token);
    if (!token) {
        return res.status(401).json({ //no autorizado
            ok: false,
            msj: 'No existe un token registrado'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        //console.log(uid);
        req.uid = uid; //nuevo elemento agregado a la req
        next();
    } catch (err) {
        return res.status(401).json({
            ok: false,
            msj: 'Token invalido...'
        });
    }
};

module.exports = ValidateJwt;