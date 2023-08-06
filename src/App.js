import './App.css';
import Topics from './components/topics';
import Chat from './components/chat';
import React, { useState } from 'react';

function App() {

  const [loggedIn, setLoggedIn] = useState(0);
  const [username, setUserName] = useState(' ');
  const [email, setEmail] = useState(' ');
  const [password,setPassword]=useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoggedIn(1);
  }

  if (loggedIn==1){
    return (
      <div className="App">
        <Topics />
        <div className="chat">
          <Chat />
        </div>
      </div>
    );
  }else{
    return (
      <div className="form-container">
        <div></div>
        <div className="form">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
                <input type="email" placeholder="email"
                  // value="name"
                  required
                />
            </div>
            <hr />
            <br />
            <div className="form-group">
              <input type="text" placeholder="username"
                // value="name"
                required
              />
            </div>
            <hr />
            <br />
            <div className="form-group">
              <input type="password" placeholder="password"
                // value="name"
                required
              />
            </div>
            <hr />
            <br />
            <button >
              Sign In
            </button>
          </form>
        </div>
        <div></div>
      </div>
    );
  }
}

export default App;
