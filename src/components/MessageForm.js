// MessageForm.js
import React, { useState } from 'react';

const MessageForm = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(text)
    onSubmit(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit}  className="form-container">
      <input
        type="text"
        value={text}
        className="message-input"
        onChange={(event) => setText(event.target.value)}
        placeholder="Enter your message"
      />
      <button type="submit" className="message-submit">Send</button>
    </form>
  );
};

export default MessageForm;
