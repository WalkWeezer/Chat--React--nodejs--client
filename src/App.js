import React, { useState, useEffect } from 'react';
import MessageForm from './components/MessageForm';
import MessageList from './components/MessageList';
import './App.css';

const SERVER_IP = 'localhost';
const SERVER_PORT = 5000;

function App() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    // Подключение к серверу WebSocket
    const ws = new WebSocket(`ws://${SERVER_IP}:${SERVER_PORT}`);


    ws.onmessage = function(event) {
      setMessages(JSON.parse(event.data));
    };

    return () => {
      ws.close();
    };
  }, []);

  const handleSubmit = async (text) => {
    const response = await fetch(`http://${SERVER_IP}:${SERVER_PORT}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });

    if (response.ok) {
      // Fetch new messages after sending message
      const updatedMessages = await response.json();
      setMessages(updatedMessages);
    }
  };

  const handleDelete = async (index) => {
    const response = await fetch(`http://${SERVER_IP}:${SERVER_PORT}/messages/${index}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      // Fetch new messages after deleting message
      const updatedMessages = await response.json();
      setMessages(updatedMessages);
    }
  };

  return (
    <div className="chat-container">
      <h1>Chat</h1>
      <MessageList messages={messages} onDelete={handleDelete} />
      <MessageForm onSubmit={handleSubmit} />
    </div>
  );
}

export default App;
