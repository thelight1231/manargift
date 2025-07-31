import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http';
import { Server } from 'socket.io';
import entriesRouter from './routes/entries.js';
import Message from './models/Message.js';

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*", // Allow all origins for now
        methods: ["GET", "POST"]
    }
});
const PORT = process.env.PORT || 4000;

// Configure CORS
const corsOptions = {
    origin: [
        'https://manary.netlify.app',  // Your Netlify domain
        'http://localhost:3000',       // For local development
        'http://localhost:4000'        // For local backend
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Backend is API only; no static files to serve

// DB connection
(async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
})();

// Routes
app.use('/api/entries', entriesRouter);

app.get('/', (_, res) => {
  res.status(200).send('Love Diary API running ❤️');
});

// Socket.IO connection
io.on('connection', async (socket) => {
    console.log('a user connected');

    // Send chat history to the newly connected client
    try {
        // Fetch last 100 messages, sorted by time
        const messages = await Message.find().sort({ timestamp: 1 }).limit(100);
        socket.emit('chat history', messages);
    } catch (error) {
        console.error('Error fetching chat history:', error);
    }

    socket.on('chat message', async (msg) => {
        // Create a new message document and save it
        const newMessage = new Message({
            text: msg.text,
            sender: msg.sender
        });
        try {
            const savedMessage = await newMessage.save();
            // Broadcast the new message to all clients
            io.emit('chat message', savedMessage);
        } catch (error) {
            console.error('Error saving message:', error);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

server.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
