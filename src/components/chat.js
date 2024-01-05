import React, { useRef, useEffect, useState } from 'react';
// import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = 'AIzaSyCAA7XNVJ7GnXFajT0rVRLBf9Pt872yYL0';
const genAI = new GoogleGenerativeAI(API_KEY);

const Chat = () => {
  // let messages = [];
  // let inputs = [];
  const [messages, setMessages] = useState([]);
  const [inputs, setInputs] = useState([]);
  const [inputText, setInputText] = useState('');
  const [receivedData, setReceivedData] = useState('');
  const [btnState, setBtnState] = useState();
  // let receivedData = "waiting for your input";
  const [error, setError] = useState(null);
  const divRef = useRef(null);

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  useEffect(() => {
    if (inputText.trim() !== '') {
      //Add new user input to inputs
      let newInput = {
        id:inputs.length+1,
        text:inputText,
        sender:'user',
      }
      setInputs([...inputs, inputText]);

      const getResponse = async (prompt) => {
        const model = genAI.getGenerativeModel({model: "gemini-pro"});
        const result = await model.generateContent(prompt);
        const response = await result.response;
        let bot = response.text();
        return bot;
      }
   
      getResponse(inputText).then(bot => {
        const newMessage = {
          id: newInput.id,
          text: bot,
          sender: 'bot',
        };
        setMessages([...messages, newMessage]);
        // console.log([newMessage.text]);
        const chatDiv = document.querySelector('.chat-messages');
        if(chatDiv){
          divRef.current = chatDiv;
          divRef.current.insertAdjacentHTML(
            'beforeend',
            `<div><div class="user">${newInput.text}</div><div class="bot">${newMessage.text}</div></div>`
          )
        }
      });
      setInputText('');
    }
  }, [btnState]);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
  };

  const handleClick = (event) => {
    const { name, value } = event.target
    setBtnState((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const generateChatGPTResponse = (userMessage) => {
    // Implement your response generation logic here
    return receivedData;
    // return receivedData;
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">

      </div>
      <form className="chat-form" onSubmit={handleFormSubmit}>
        <></>
        <div className="chat-form-input">
            <textarea
            type="text"
            placeholder=""
            value={inputText}
            onChange={handleInputChange}
            >
            </textarea>
            <a href="#"><button type="submit" onClick={handleClick}>
              <ArrowForwardIcon />
            </button></a>
        </div>
        <></>
      </form>
    </div>
  );
};

export default Chat;
