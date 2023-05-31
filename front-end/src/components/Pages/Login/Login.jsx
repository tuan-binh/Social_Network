import "./Login.scss";

import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

import axios from "axios";

function Login() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const [dataLogin, setDataLogin] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setDataLogin({ ...dataLogin, [name]: value });
  }
  console.log(dataLogin);
  // logic handle login
  const [getUser, setGetUser] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const loadUser = async () => {
    await axios
      .get("http://localhost:8000/users")
      .then((res) => setGetUser(res.data))
      .catch((err) => console.log(err));
  };

  function handleLogin() {
    let check = -1;
    for (let i = 0; i < getUser.length; i++) {
      if (getUser[i].username === dataLogin.username) {
        if (getUser[i].password === dataLogin.password) {
          if (getUser[i].isBlock) {
            setError("Tài khoản của bạn đã bị khóa");
            break;
          } else {
            check = i;
          }
        } else {
          setError("Bạn đã nhập sai mật khẩu");
          break;
        }
      } else {
        setError("Bạn chưa tạo tài khoản");
      }
    }

    if (check !== -1) {
      setSuccess(true);
      setTimeout(() => {
        window.location.href = "/";
        localStorage.setItem("checkLogin", true);
        localStorage.setItem("dataUserLogin", JSON.stringify(getUser[check]));
        setError("");
      }, 1000);
    }
  }

  // end logic đăng nhập

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="flex-login">
      <div className="box">
        <h2>Đăng nhập</h2>
        {!success ? (
          error ? (
            <p style={{ textAlign: "center", color: "red", fontWeight: "600" }}>
              <i className="fa-solid fa-xmark"></i> {error}
            </p>
          ) : (
            <></>
          )
        ) : (
          <p style={{ textAlign: "center", color: "green", fontWeight: "600" }}>
            <i className="fa-solid fa-check"></i> Đăng Nhập Thành Công
          </p>
        )}
        <Form
          // onSubmit={handleLogin}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <label htmlFor="pass">Username: </label>
          <Form.Item
            name="username"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <Input
              name="username"
              onChange={handleChange}
              placeholder="Username"
            />
          </Form.Item>
          <label htmlFor="pass">Password: </label>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input.Password
              name="password"
              onChange={handleChange}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <div className="flex-btn-login">
              <button
                onClick={handleLogin}
                type="submit"
                className="cssbuttons-io-button"
              >
                <span style={{ textAlign: "center" }}>Sign In</span>
                <div className="icon">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path
                      fill="currentColor"
                      d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                    ></path>
                  </svg>
                </div>
              </button>
            </div>
          </Form.Item>
          <Form.Item>
            <p style={{ textAlign: "center" }}>
              Or{" "}
              <Link to={"/register"}>
                Register now <i className="fa-solid fa-arrow-right-long"></i>
              </Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
