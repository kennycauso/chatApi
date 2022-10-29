const uuid = require('uuid');
const Messages = require('../models/messages.models');

const getAllMessagesByConversation = async (conversationId) => {
    const data = await Messages.findAll({
        where: {
            conversationId
        }
    });
    return data;
}

const getMessageByConversationById = async (conversationId, messageId) => {
    const data = await Messages.findOne({
        where: {
            conversationId,
            id: messageId
        }
    });
    return data;
}

const createMessageByConversationId = async (id, data) => {
    const newMessage = await Messages.create({
        id: uuid.v4(),
        userId: data.userId,
        conversationId: id,
        message: data.message
    });
    return newMessage;
};

const deleteMessageByConversationById = async (conversationId, messageId) => {
    const data = await Messages.destroy({
        where: {
            conversationId,
            id: messageId
        }
    });
    return data;
}

module.exports = {
    getAllMessagesByConversation,
    getMessageByConversationById,
    createMessageByConversationId,
    deleteMessageByConversationById
};