import React, { useRef, useEffect, useState } from 'react';
// import Button from '@mui/material/Button';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

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

  const gptResponseURL = 'http://127.0.0.1:5000/gptRespond';
  const gptQueryURL = 'http://127.0.0.1:5000/sendQuery';

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

      //Send input to server

      //Fetch to input from server
      fetch(gptResponseURL,{
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({'query':inputText}),
      })
        .then(res => res.text())
        .then(
          data => {
            setReceivedData(data)
            // console.log(receivedData);
            setError(null);
          })
        .catch(error => {
          console.error('Error fetching data:', error);
          setError('Error fetching data. Please try again.');
        });

      const response = generateChatGPTResponse();
      const newMessage = {
        id: newInput.id,
        text: response,
        sender: 'bot',
      };
      setMessages([...messages, newMessage]);
      console.log([newMessage.text]);

      setInputText('');

      const chatDiv = document.querySelector('.chat-messages');
      if(chatDiv){
        divRef.current = chatDiv;
        divRef.current.insertAdjacentHTML(
          'beforeend',
          `<div><div class="user">${newInput.text}</div><div class="bot">${newMessage.text}</div></div>`
        )
      }

      // messages.map((member) => {
      //   console.log(member.id);
      // });
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
