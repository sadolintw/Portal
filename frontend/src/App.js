import logo from './logo.svg';
import './App.css';
import { Button } from 'antd';
import * as React from 'react';
import axios from 'axios';

function App() {
  //Auth URL: https://notify-bot.line.me/oauth/authorize

  window.axios = axios

  React.useEffect(() => {
    let params = new URLSearchParams(document.location.search)
    if(params.has('code') && params.has('state')){
      console.log('hii')
      axios('/api/getAccessToken', {code: params.get('code'), state: params.get('state')}).then(res => console.log(res))
    }
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <Button
          type="primary"
          onClick={() => {
            let url = new URL('https://notify-bot.line.me/oauth/authorize')
            let params = new URLSearchParams()
            params.append('response_type', 'code')
            params.append('client_id', 'rXvuJyRkBGXKdUz8van7CJ')
            params.append('redirect_uri', 'http://localhost:3000')
            params.append('scope', 'notify')
            params.append('state', '123')
            url.search = params
            console.log(url.href)
            //http://localhost:3000/?code=dqC9YBK1PJtbuyX9yUMTIE&state=123
          }}
        >Button</Button>
      </header>
    </div>
  );
}

export default App;
