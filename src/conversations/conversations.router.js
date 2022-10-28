
const router = require('express').Router();
const conversationServices = require('./conversations.services');
const messageServices = require('../messages/messages.services');

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
    .get(passport.authenticate('jwt', { session: false }), messageServices.getAllMessagesByConversation)
    .post(passport.authenticate('jwt', { session: false }), messageServices.createMessageByConversationId)

router.route('/:conversation_id/messages/:message_id')
    .get(passport.authenticate('jwt', { session: false }), messageServices.getMessageByConversationById)
    .delete(passport.authenticate('jwt', { session: false }), messageServices.deleteMessageByConversationById)


module.exports = router;