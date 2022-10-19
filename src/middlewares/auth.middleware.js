// Middleware para proteger rutas
// 1. revisar si existe un token
// 2. verificar si el token pertenece a un usuario válido
// 3. modificar el req y agregar req.user con la información descencriptada del token

const { jwtSecret } = require('../config');
const { getUserById } = require('../users/users.controllers');

const JwtStrategy = require('passport-jwt').Strategy; //Maneja estrategias para las diferentes autenticaciones.  Diferente maneras de hacer un LOGIN (Con facebook, google, github, etc..)
const ExtractJwt = require('passport-jwt').ExtractJwt; //Extrae los headers de la petición


// Se exporta función anónima:
module.exports = (passport) => {
    const options = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
        secretOrKey: jwtSecret
    };
    passport.use(
        new JwtStrategy(options, async (decoded, done) => {
            // done(error, decoded) decoded es el token decodificado
            try {
                const response = await getUserById(decoded.id)
                if(!response){
                    return done(null, false);
                }
                console.log('decoded JWT', decoded);
                return done(null, decoded);
            } catch (error) {
                return done(error, false);
            }
        })
    );
};


