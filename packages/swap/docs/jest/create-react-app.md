## 使用 **create-react-app** 进行jest单测

```jsx
// /src/app.js
import React, {useEffect, useState} from 'react';
import './App.css';
import axios from 'axios'
import { swapCall } from '@tencent/swap'

function App() {
  const [code, setCode] = useState(0)
  const click = () => {
    setCode(+code + 1)
  }
  useEffect(()=>{
    const fetchData = async () => {
      swapCall('jsbridge://weseeLive/getLiveInfo', {})
      const res = await axios.get('https://yapi.baidu.com/mock/6333/v1/api/list')
      // { data: { code: 200 } }
      setCode(res.data.code)
    }
    fetchData()
  }, [])
  
  return (
    <div className="App">
      <header className="App-header">
        <div>Learn React</div>
        <div className="code" onClick={click}>{code}</div>
      </header>
    </div>
  );
}

export default App;


```


```jsx
// src/App.test.js

import React from 'react';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from './App';
import { swapJestListen } from "@tencent/swap";
swapJestListen()

test('renders learn react link', async () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  await waitFor(async ()=> {
    const codeElement = screen.getByText(/200/i);
    expect(codeElement).toBeInTheDocument();
    await fireEvent.click(codeElement);
    const codeElement2 = screen.getByText(/201/i);
    expect(codeElement2).toBeInTheDocument();
  })
});


```
