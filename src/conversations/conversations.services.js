const conversationsControllers = require('./conversations.controllers');

const getAllConversations = (req, res) => {
    conversationsControllers.getAllConversations()
        .then(response => res.status(200).json(response))
        .catch(err => res.status(400).json({ message: err.message }))
};

const getConversationById = (req, res) => {
    const id = req.params.conversation_id;
    conversationsControllers.getConversationById(id)
        .then(response => res.status(200).json(response))
        .catch(err => res.status(404).json({ message: err.message }))
};

const createConversation = (req, res) => {
    const { title, imageUrl, userId } = req.body;
    if (title && userId) {
        conversationsControllers.createConversation({ title, imageUrl, userId })
            .then(response => res.status(201).json(response))
            .catch(err => res.status(400).json({ message: err.message }))
    } else {
        res.status(400).json({
            message: 'Fields title and User are required', fields: {
                title: 'string',
                imageUrl: 'url',
                userId: 'uuid'
            }
        })
    }
}

const patchConversation = (req, res) => {
    const id = req.params.conversation_id;
    const { title, imageUrl } = req.body;
    conversationsControllers.updateConversation(id, { title, imageUrl })
        .then(response => {
            if (response[0]) {
                res.status(200).json({ message: `User with ID: ${id}, edited succesfully!` })
            } else {
                res.status(400).json({ message: 'Invalid ID' })
            }
        })
        .catch(err => res.status(400).json({ message: err.message }))
};

const deleteConversation = (req, res) => {
    const id = req.params.conversation_id;
    conversationsControllers.deleteConversation(id)
        .then(response => {
            if (response) {
                res.status(204).json({ message: "Deleted successfully" });
            } else {
                res.status(404).json({ message: "Invalid ID" });
            }
        })
        .catch(err => res.status(400).json({ message: err.message }))
};

module.exports = {
    getAllConversations,
    getConversationById,
    createConversation,
    patchConversation,
    deleteConversation
};