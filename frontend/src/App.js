import logo from './logo.svg';
import './App.css';
import { Button, Checkbox, Form, Input, Card, Row } from 'antd';
import * as React from 'react';
import axios from 'axios';
import { Typography } from 'antd';
const { Title } = Typography;
function App() {
  //Auth URL: https://notify-bot.line.me/oauth/authorize

  const [lineNotifyAccessToken, setLineNotifyAccessToken] = React.useState(null)
  const [clientId, setClientId] = React.useState(localStorage.getItem('client_id')||'')
  const [clientSecret, setClientSecret] = React.useState(localStorage.getItem('client_secret')||'')
  const [form] = Form.useForm();

  const serverUrl = 'https://portal-api.sadolintw.app'

  React.useEffect(() => {
    let params = new URLSearchParams(document.location.search)
    if (params.has('code') && params.has('state')) {
      console.log('hii')
      form.setFieldsValue({client_id: clientId, client_secret: clientSecret})

      axios({
        method: 'GET',
        url: `${serverUrl}/api/line_notify/getAccessToken`,
        // url: `${process.env.REACT_APP_API_URL}/api/line_notify/getAccessToken`,
        params: {
          code: params.get('code'),
          state: params.get('state'),
          client_id: clientId,
          client_secret: clientSecret
        }
      }).then(res => {
        console.log(res)
        if (res?.data) {
          setLineNotifyAccessToken(res.data)
          form.setFieldsValue({ access_token: res.data })
        }
      })
      // axios('/api/getAccessToken', {code: params.get('code'), state: params.get('state')}).then(res => console.log(res))
    }
  }, [])

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <Card>
          <Title level={2}>
              Line Login
          </Title>
          <Form>
            
          </Form>
        </Card>

        <Card>
          <Title level={2}>
            Line Notify
          </Title>
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrappercol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item>
              <a href="https://notify-bot.line.me/zh_TW/">Notify-BOT</a>
            </Form.Item>

            <Form.Item
              label="client_id"
              name="client_id"
              rules={[
                {
                  required: true,
                  message: 'Please input your client_id!',
                },
              ]}
              onChange={(e) => {setClientId(e.target.value)}}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="client_secret"
              name="client_secret"
              rules={[
                {
                  required: true,
                  message: 'Please input your client_secret!',
                },
              ]}
              onChange={(e) => {setClientSecret(e.target.value)}}
            >
              <Input.Password />
            </Form.Item>

            {
              clientId && clientSecret ?
                <>
                  <Form.Item
                    wrappercol={{
                      offset: 8,
                      span: 16,
                    }}
                    style={{ textAlign: "right" }}
                  >
                    Line Notify Access Token
                    <Button
                      wrappercol={{
                        offset: 16,
                        span: 8,
                      }}
                      type="primary"
                      onClick={() => {
                        let client_id = form.getFieldValue('client_id')
                        let client_secret = form.getFieldValue('client_secret')
                        console.log(client_id, client_secret)

                        if (client_id && client_secret) {
                          let url = new URL('https://notify-bot.line.me/oauth/authorize')
                          let params = new URLSearchParams()

                          localStorage.setItem('client_id', client_id)
                          localStorage.setItem('client_secret', client_secret)

                          params.append('response_type', 'code')
                          params.append('client_id', 'rXvuJyRkBGXKdUz8van7CJ')
                          params.append('redirect_uri', serverUrl)
                          // params.append('redirect_uri', process.env.REACT_APP_REDIRECT_URI)
                          params.append('scope', 'notify')
                          params.append('state', '123')
                          url.search = params
                          console.log(url.href)
                          window.location.href = url.href
                          //http://localhost:3000/?code=dqC9YBK1PJtbuyX9yUMTIE&state=123
                        }
                      }}
                      style={{ marginLeft: '10px' }}
                    >Get</Button>
                  </Form.Item>

                  <Form.Item
                    label="Message"
                    name="message"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your message!',
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>

                  <Form.Item
                    label="Access Token"
                    name="access_token"
                    rules={[
                      {
                        required: true,
                        message: 'Please input your access token!',
                      },
                    ]}
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    wrappercol={{
                      offset: 8,
                      span: 16,
                    }}
                    style={{ textAlign: "right" }}
                  >
                    <Button
                      type="primary"
                      htmlType="submit"
                      onClick={() => {
                        let message = form.getFieldValue('message')
                        let access_token = form.getFieldValue('access_token')
                        console.log(message)
                        if (message && access_token) {
                          axios({
                            method: 'GET',
                            url: `${serverUrl}/api/line_notify/sendNotification`,
                            // url: `${process.env.REACT_APP_API_URL}/api/line_notify/sendNotification`,
                            params: {
                              message: message,
                              access_token: access_token
                            }
                          }).then(res => {
                            console.log(res)
                          })
                        }
                      }}
                    >
                      Send
                    </Button>
                  </Form.Item>
                </>
                :
                <></>
            }

          </Form>
        </Card>
      </header>
    </div>
  );
}

export default App;
