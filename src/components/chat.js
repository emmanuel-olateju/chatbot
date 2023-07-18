import React, { useState } from 'react';
import Button from '@mui/material/Button';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (inputText.trim() !== '') {
      sendMessage(inputText);
      setInputText('');
    }
  };

  const sendMessage = (text) => {
    const newMessage = {
      id: messages.length + 1,
      text,
      sender: 'user',
    };

    setMessages([...messages, newMessage]);

    // Simulate ChatGPT response
    setTimeout(() => {
      const response = generateChatGPTResponse(text);
      const botMessage = {
        id: messages.length + 2,
        text: response,
        sender: 'bot',
      };
      setMessages([...messages, botMessage]);
    }, 500);
  };

  const generateChatGPTResponse = (userMessage) => {
    // Implement your response generation logic here
    // You can use external AI models or predefined responses based on user input
    // For simplicity, we'll return a static response
    return "I'm sorry, I'm just a mimic. I don't have actual ChatGPT capabilities.";
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        {messages.map((message) => (
          <div key={message.id} className={`message ${message.sender}`}>
            {message.text}
          </div>
        ))}
      </div>
      <form className="chat-form" onSubmit={handleFormSubmit}>
        <div className="chat-form-input">
            <textarea
            type="text"
            placeholder="Type a message..."
            value={inputText}
            onChange={handleInputChange}
            >
            </textarea>
            <Button type="submit" variant="contained" color="primary">Send</Button>
        </div>
      </form>
    </div>
  );
};

export default Chat;
