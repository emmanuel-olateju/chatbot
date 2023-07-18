import './App.css';
import Topics from './components/topics';
import Chat from './components/chat';

function App() {
  return (
    <div className="App">
      <Topics />
      <div className="chat">
        <Chat />
      </div>
    </div>
  );
}

export default App;
