import "./LoginAdmin.scss";

import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import React from "react";
import { useState } from "react";

function LoginAdmin() {
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const [valueLogin, setValueLogin] = useState({});

  function handleChangeText(e) {
    const { name, value } = e.target;
    setValueLogin({ ...valueLogin, [name]: value });
  }

  function handleLogin() {
    if (
      valueLogin.email === "admin@gmail.com" &&
      valueLogin.password === "abc@abc"
    ) {
      localStorage.setItem("checkAdmin", true);
      window.location.href = "/";
    }
  }

  return (
    <div className="flex-login-admin">
      <div className="box-login-admin">
        <h2>ADMIN</h2>
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your Username!",
              },
            ]}
          >
            <Input
              value={valueLogin.email}
              name="email"
              onChange={handleChangeText}
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              value={valueLogin.password}
              name="password"
              onChange={handleChangeText}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              onClick={handleLogin}
              type="primary"
              htmlType="submit"
              className="login-form-button login-admin"
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default LoginAdmin;
