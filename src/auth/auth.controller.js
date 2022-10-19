// Email y contraseña del usuario
// El email es único en la db

const { getUserByEmail } = require('../users/users.controllers')
const { comparePassword } = require('../utils/crypto')


const loginUser = async (email, password) => {
    // Este controlador tiene 2 respuestas: Credenciales son válidas o inválidas.
    try { //Se usa TRY CATCH para resolver una promesa(tiene que estar dentro de un async) y porque se espera una respuesta "return" de la función, en vez de THEN y CATCH.

        const user = await getUserByEmail(email) //devuelve los datos de la db
        const verifyPassword = comparePassword(password, user.password)
        if (verifyPassword) {
            return user;
        }
        return false;

    } catch (error){
        return false;
    }
};

module.exports = {loginUser};