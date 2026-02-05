const messageService = require('../services/message.service')

const getMessages = async (req: any, res: any) => {
    try {
        const receiverId = Number(req.params.id);
        const senderId = req.user.id;

        const result = await messageService.getMessages({ receiverId, senderId });

        return res.status(result.status).json(result);

    } catch (err: any) {
        return res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = {
  getMessages
}