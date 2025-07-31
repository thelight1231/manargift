document.addEventListener('DOMContentLoaded', () => {
    const currentUser = localStorage.getItem('currentUser');

    // If no user is selected, redirect to the main page to force selection
    if (!currentUser) {
        window.location.href = 'index.html';
        return;
    }

    const socket = io('http://localhost:4000');
    const chatForm = document.getElementById('chat-form');
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');

    // --- Event Listeners ---
    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const messageText = chatInput.value.trim();
        if (messageText) {
            const message = {
                text: messageText,
                sender: currentUser
            };
            socket.emit('chat message', message);
            chatInput.value = '';
            chatInput.focus();
        }
    });

    // --- Socket.IO Event Handlers ---
    socket.on('connect', () => {
        console.log('Connected to chat server!');
    });

    socket.on('chat history', (history) => {
        chatMessages.innerHTML = ''; // Clear previous messages
        history.forEach(msg => {
            displayMessage(msg);
        });
        scrollToBottom();
    });

    socket.on('chat message', (msg) => {
        displayMessage(msg);
        scrollToBottom();
    });

    // --- Helper Functions ---
    function displayMessage(msg) {
        const item = document.createElement('li');
        
        // Create a span for the sender's name
        const senderName = document.createElement('span');
        senderName.className = 'sender-name';
        senderName.textContent = msg.sender;

        // Create a span for the message text
        const messageText = document.createElement('span');
        messageText.className = 'message-text';
        messageText.textContent = msg.text;

        // Add the sender name and message text to the list item
        item.appendChild(senderName);
        item.appendChild(messageText);
        
        // Add appropriate class based on sender
        item.classList.add(msg.sender === currentUser ? 'sent' : 'received');
        
        // Append to chat messages container
        chatMessages.appendChild(item);
        
        // Log for debugging
        console.log('Message displayed:', msg);
    }

    function scrollToBottom() {
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
