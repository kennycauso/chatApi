const bcrypt =  require('bcrypt');

const hashPassword = (plainPassword) => { //pass123
    return bcrypt.hashSync(plainPassword,10); //ejecuta 10 veces la función bcrypt
};

// Comparación de contraseñas, por ejemplo para hacer un LOGIN con CONTRASEÑA
const comparePassword = (plainPassword, hashedPassword) => {
    return bcrypt.compareSync(plainPassword, hashedPassword);
};

// console.log(hashPassword('root'))
// console.log(comparePassword('root', '$2b$10$sCnd4KJA73k91npAsUCXHuIccAvicel1pgvy4DWqfZcxJls9VZSUa'))

module.exports = {
    hashPassword,
    comparePassword
};