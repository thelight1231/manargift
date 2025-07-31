import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    sender: {
        type: String,
        required: true // e.g., 'You' or 'Wife'
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

const Message = mongoose.model('Message', messageSchema);

export default Message;
