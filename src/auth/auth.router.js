// Auth contiene las rutas de autorización y autenticación :
// - login
// - register
// - recovery password
// - verify user

const router = require('express').Router();
// ruta para crear un usuario:
const {registerUser} = require('../users/users.services');
const authServices = require('./auth.services');


router.post('/register', registerUser);
router.post('/login', authServices.login);

module.exports = router;
