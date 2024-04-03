// MessageList.js
import React from 'react';

const MessageList = ({ messages, onDelete }) => {
  return (
    <ul className="message-list">
      {messages.map((message, index) => (
        <li key={index} className="message-item">
          {message.text}
          <button onClick={() => onDelete(index)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default MessageList;
