import React, { useRef} from "react";
import { BrowserRouter } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import IdleTimer from 'react-idle-timer'
import 'antd/dist/antd.css';

import "./App.css";

import '@material/react-material-icon/dist/material-icon.css';

function App() {

  const idleTimer = useRef(null)

  function onAction(e) {
    console.log('user did something', e)
  }
 
  function onActive(e) {
    console.log('user is active', e)
    if (!idleTimer) return
    // console.log('time remaining', idleTimer.getRemainingTime())
  }
 
 function onIdle(e) {
    console.log('user is idle', e)
    if (!idleTimer) return
    // console.log('last active', idleTimer.getLastActiveTime())
  }

  return (
    <BrowserRouter>
      <div className="appWrapper">
        
        <Wrapper />

        <IdleTimer
          ref={idleTimer}
          element={document}
          onActive={onActive}
          onIdle={onIdle}
          onAction={onAction}
          debounce={10000}
          timeout={1000 * 60 * 15} />
      </div>
    </BrowserRouter>
  );
}

export default App;
