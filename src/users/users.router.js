const router = require('express').Router();
const { getAllUsers } = require('./users.controllers');
const userServices = require('./users.services');
const adminValidate = require('../middlewares/role.middleware')

// ----Dependencias para rutas protegidas----
const passport = require('passport');
require('../middlewares/auth.middleware')(passport);
// ----


// ruta raiz
// router.get('/', userServices.getAllUsers);
// -----RUTA PROTEGIDA del router.get('/', ... ) :-----
router.get('/',
    passport.authenticate('jwt', { session: false }),
    userServices.getAllUsers);


// EL createUser,POST irá en la ruta /auth/register


// Rutas dinámicas por ID:
// router.get('/:ID');
// router.patch('/:ID');
// router.put('/:ID');
// router.delete('/:ID');


// Ruta de información propia del usuario loggeado:
router.route('/me')
    .get(
        passport.authenticate('jwt', { session: false }),
        userServices.getMyUser)
    .patch(
        passport.authenticate('jwt', { session: false }),
        userServices.patchMyUser
    )
    .delete(
        passport.authenticate('jwt', { session: false }),
        userServices.deleteMyUser
    )


router.route('/:id')
    .get(userServices.getUserById)
    .patch(
        passport.authenticate('jwt', { session: false }),
        adminValidate,
        userServices.patchUser
    )
    .delete(
        passport.authenticate('jwt', { session: false }),
        adminValidate,
        userServices.deleteUser
    )






module.exports = router;