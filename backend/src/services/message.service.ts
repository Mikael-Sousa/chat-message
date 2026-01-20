const messageModel = require('../models/message.model')
import type { Messages } from '../types/index'

const saveMessage = async (messages: Messages) => {
    const message = await messageModel.saveMessage({
        senderId: messages.senderId,
        receiverId: messages.receiverId,
        content: messages.content
    })

    return message
}

module.exports = { saveMessage };
