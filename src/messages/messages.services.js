const messageControllers = require('./messages.controllers');

const getAllMessagesByConversation = (req, res) => {
    const id = req.params.conversation_id;
    messageControllers.getAllMessagesByConversation(id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(404).json({ message: err.message }))
};

const createMessageByConversationId = (req, res) => {
    const id = req.params.conversation_id;
    const { userId, message } = req.body;
    messageControllers.createMessageById(id, { userId, message })
        .then(response => res.status(200).json(response))
        .catch(err => res.status(404).json({ message: err.message }))
};

const getMessageByConversationById = (req, res) => {
    const conversationId = req.params.conversation_id;
    const messageId = req.params.message_id;
    messageControllers.getMessageByConversationById(conversationId, messageId)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(404).json({ message: err.message }))
};

const deleteMessageByConversationById = (req, res) => {
    const id = req.params.conversation_id;
    const { userId, message } = req.body;
    messageControllers.createMessageById(id, { userId, message })
        .then(response => {
            if (response) {
                res.status(204).json({message: "deleted successfully"});
            } else {
                res.status(404).json({ message: "Invalid ID" });
            }
        })
        .catch(err => res.status(404).json({ message: err.message }))
};


module.exports = {
    getAllMessagesByConversation,
    createMessageByConversationId,
    getMessageByConversationById,
    deleteMessageByConversationById
};
