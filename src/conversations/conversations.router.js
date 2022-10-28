
const router = require('express').Router();
const conversationServices = require('./conversations.services');

// ----Dependencias para rutas protegidas----
const passport = require('passport');
require('../middlewares/auth.middleware')(passport);
// ----

router.route('/')
    .get(passport.authenticate('jwt', { session: false }), conversationServices.getAllConversations)
    .post(passport.authenticate('jwt', { session: false }), conversationServices.createConversation)

router.route('/:conversation_id')
    .get(passport.authenticate('jwt', { session: false }), conversationServices.getConversationById)
    .patch(passport.authenticate('jwt', { session: false }), conversationServices.patchConversation)
    .delete(passport.authenticate('jwt', { session: false }), conversationServices.deleteConversation)

router.route('/:conversation_id/messages')
    .get('jwt', { session: false },)
    .post('jwt', { session: false },)

router.route('/:conversation_id/messages/:message_id')
    .get('jwt', { session: false },)
    .delete('jwt', { session: false },)


module.exports = router;