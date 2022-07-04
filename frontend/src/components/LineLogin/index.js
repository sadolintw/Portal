import axios from 'axios';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Card,
  Row,
  Typography,
  Space
} from 'antd';
import React from 'react';

const { Title } = Typography;



function LineLogin() {
  const serverUrl = 'http://localhost:3000'

  const [form] = Form.useForm();
  const [clientId, setClientId] = React.useState('1657270458');

  React.useEffect(() => {
    form.setFieldsValue({
      client_id: clientId
    })
    if(document.location.hash.endsWith('linelogin')){
      console.log('redirect from line login')
      let params = new URLSearchParams(document.location.search)
      if (params.has('code') && params.has('state')) {
        axios({
          method: 'GET',
          url: `${serverUrl}/api/line_login/getAccessToken`,
          params: {
            code: params.get('code'),
            client_id: clientId
          }
        }).then(res => {
          console.log(res)
          if (res?.data) {
            // setLineLoginAccessToken(res.data)
            form.setFieldsValue({ access_token: res.data })
          }
        })
      }
    }
  }, [])

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const handleLineLoginAuthorize = () => {
    if(clientId){
      let url = new URL('https://access.line.me/oauth2/v2.1/authorize')
      let params = new URLSearchParams()

      params.append('response_type', 'code')
      params.append('client_id', clientId)
      params.append('redirect_uri', `${serverUrl}/#/linelogin`)
      params.append('state', '123')
      params.append('scope', 'openid')
      url.search = params
      console.log(url.href)
      window.location.href = url.href
    }
  }

  return (
    <>
      <Card>
        <Title level={2}>
          Line Login
        </Title>
        <Form
          form={form}
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
          <Form.Item
            label="client_id"
            name="client_id"
            rules={[
              {
                required: true,
                message: 'Please input your client_id!',
              },
            ]}
          >
            <Input disabled={true} />
          </Form.Item>
          <Form.Item
            wrappercol={{
              offset: 8,
              span: 16,
            }}
            style={{ textAlign: "right" }}
          >
            <Button
              wrappercol={{
                offset: 16,
                span: 8,
              }}
              type="primary"
              onClick={handleLineLoginAuthorize}
            >
              Authorize
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </>
  )
}

export default LineLogin;