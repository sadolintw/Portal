import LineLogin from './components/LineLogin'
import LineNotify from './components/LineNotify'
import logo from './logo.svg';
import './App.css';
import {
  Form,
  Typography,
  Space
} from 'antd';
import * as React from 'react';

const { Title } = Typography;

function App() {
  //Auth URL: https://notify-bot.line.me/oauth/authorize
  // const serverUrl = 'https://portal-api.sadolintw.app'


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Space
          direction="vertical"
          size="middle"
          style={{ display: 'flex' }}
        >
          <LineLogin />
          <LineNotify />
        </Space>
      </header>
    </div>
  );
}

export default App;
