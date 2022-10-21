import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [code, setCode] = useState(0);
  const [appNames, setAppNames] = useState('unknown');
  
  useEffect(() => {
    const fetchData = async () => {

      /**
       * windvane call
       */
      window?.WindVane?.call(
        'LAZOLOZEventHandler',
        'getDeviceInfo',
        {},
        ({appNames}) => {
          setAppNames(appNames)
        },
        () => {
          console.log('getDeviceInfo failed!');
        }
      );

      /**
       * fetch call
       */
      const res = await axios.get('/list');
      setCode(res.data.code);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <div>{appNames}</div>
        <div className="code">
          {code}
        </div>
      </header>
    </div>
  );
}

export default App;
