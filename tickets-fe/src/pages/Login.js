import { Button, Divider, Form, Input, InputNumber, Typography } from "antd";
import { LoginOutlined } from "@ant-design/icons";
import { Redirect, useHistory } from "react-router-dom";
import { useState } from "react";
import { getUserStorage } from "../helpers/getUserStorage";

const { Title, Text } = Typography;

export const Login = () => {
  const history = useHistory();
  const [user] = useState(getUserStorage());

  const onFinish = ({ agent, desktop }) => {
    localStorage.setItem("agent", agent);
    localStorage.setItem("desktop", desktop);
    history.push("/desktop");
  };
  const onFinishFailed = (errorInfo) => {
    console.error("Failed:", errorInfo);
  };

  if (user && user.agent && user.desktop) {
    return <Redirect to="/desktop" />;
  }

  return (
    <>
      <Title label={2}>Log in</Title>
      <Text>Enter your name and desktop numver</Text>
      <Divider />
      <Form
        name="basic"
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
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
          label="Agent name"
          name="agent"
          rules={[
            {
              required: true,
              message: "Please input your agent name",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Desktop"
          name="desktop"
          rules={[
            {
              required: true,
              message: "Please input your Desktop",
            },
          ]}
        >
          <InputNumber min={1} max={99} />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 4,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit" shape="round">
            <LoginOutlined />
            Log in
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};
