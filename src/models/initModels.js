const Users = require('./users.models');
const Conversations = require('./conversations.models');
const Messages = require('./messages.models');
const Participants = require('./participants.models')

const initModels = () => {

    Messages.belongsTo(Users)
    Users.hasMany(Messages)
    Messages.belongsTo(Conversations)
    Conversations.hasMany(Messages)

    Participants.belongsTo(Conversations)
    Conversations.hasMany(Participants)
    Participants.belongsTo(Users)
    Users.hasMany(Participants)

    Conversations.belongsTo(Users)
    Users.hasMany(Conversations)

};

module.exports = initModels;
