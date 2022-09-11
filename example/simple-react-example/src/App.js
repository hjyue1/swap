import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { swapCall } from 'rocket-swap';

function App() {
  const [code, setCode] = useState(0);
  const [userInfo, setUser] = useState('unknown');
  
  useEffect(() => {
    const fetchData = async () => {
      const { user } = await swapCall('jsbridge://weseeLive/getLiveInfo', {});
      const res = await axios.get('/list');
      setCode(res.data.code);
      setUser(user);
    };
    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>{userInfo}</div>
        <div className="code">
          {code}
        </div>
      </header>
    </div>
  );
}

export default App;
