const messageModel = require('../models/message.model')
import type { Messages } from '../types/index'

const getMessages = async (messages: Messages) => {
    const message = await messageModel.getMessages({
        senderId: messages.senderId,
        receiverId: messages.receiverId,
    })

    if (!message) {
        return { status: 400, message: "Request failed" };
    }

    return {
        status: 200,
        data: message,
    };
}

const saveMessage = async (messages: Messages) => {
    const message = await messageModel.saveMessage({
        senderId: messages.senderId,
        receiverId: messages.receiverId,
        content: messages.content
    })

    return message
}

module.exports = {
    saveMessage,
    getMessages
};
