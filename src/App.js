import React,{useState} from 'react';
import './App.css';
import SignIn from './views/SignIn';
import Admin from './views/Admin';
import Game from './views/Game';
import {Router} from '@reach/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import TCContext from './contexts/TcContext';

function App() {
  const [tcId,setTcId] = useState("");
  const [userId,setUserId] = useState("");
  return (
    <div className="main-bg h-100">
      
      <TCContext.Provider value={{tcId,setTcId,userId,setUserId}}>
        <Router>
            <SignIn path="/" />
            <Admin path="/facilitator" />
            <Game path="/scenario" />
        </Router>

      </TCContext.Provider>
      
    </div>
  );
}

export default App;
