const db =  require('../utils/database');
const { DataTypes } = require('sequelize');
const Conversations = require('./conversations.models');
const Users = require('./users.models');

const Messages = db.define('messages', {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false
    },
    userId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'user_id',
        references: {
            key: 'id',
            model: Users
        }
    },
    conversationId: {
        type: DataTypes.UUID,
        allowNull: false,
        field: 'conversation_id',
        references: {
            key: 'id',
            model: Conversations
        }
    },
    message: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

module.exports = Messages;