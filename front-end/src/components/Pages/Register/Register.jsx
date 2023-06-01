import "./Register.scss";

import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import React, { useEffect, useState } from "react";

import axios from "axios";

function Register() {
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };

  const [valueRegister, setValueRegister] = useState({});
  const [error, setError] = useState("");

  const [dataUser, setDataUser] = useState([]);

  const loadUser = async () => {
    await axios
      .get("http://localhost:8000/users")
      .then((res) => setDataUser(res.data))
      .catch((err) => console.log(err));
  };

  function handleChangeValue(e) {
    const { name, value } = e.target;
    setValueRegister({ ...valueRegister, [name]: value });
  }

  const [success, setSuccess] = useState("");

  console.log("valueRegister ->", valueRegister);
  async function handleRegister() {
    if (
      !checkSpace(valueRegister.username) ||
      !checkSpace(valueRegister.password) ||
      !checkSpace(valueRegister.confirmPassword)
    ) {
      setError("Bạn không được nhập khoảng trắng");
      console.log("hello");
    } else {
      let check = false;
      for (let i = 0; i < dataUser.length; i++) {
        if (dataUser[i].username !== valueRegister.username) {
          if (valueRegister.password === valueRegister.confirmPassword) {
            check = true;
          } else {
            check = false;
            setError("Mật khẩu không giống nhau");
            break;
          }
        } else {
          check = false;
          setError("Tài khoản này đã được tạo rồi");
          break;
        }
      }

      if (check) {
        setError("");
        setSuccess("Đăng Ký Thành Công");
        setTimeout(() => {
          axios.post("http://localhost:8000/users", {
            username: valueRegister.username,
            password: valueRegister.password,
            urlAvatar: "https://www.w3schools.com/howto/img_avatar.png",
            urlWallpaper: "https://www.w3schools.com/howto/img_avatar.png",
            isBlock: false,
          });
          navigate("/login");
        }, 1000);
      }
    }
  }

  function checkSpace(str) {
    let newArr = str.split("");
    for (let i = 0; i < newArr.length; i++) {
      if (newArr[i] === " ") {
        return false;
      }
    }
    return true;
  }

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <div className="flex-register">
      <div className="box-register">
        <h2>Register</h2>
        {error ? (
          <p style={{ textAlign: "center", color: "red" }}>
            <i className="fa-solid fa-xmark"></i> {error}
          </p>
        ) : (
          ""
        )}
        {success ? (
          <p style={{ textAlign: "center", color: "green" }}>
            <i className="fa-solid fa-check"></i> {success}
          </p>
        ) : (
          ""
        )}
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
              onChange={handleChangeValue}
              name="username"
              value={valueRegister.username}
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
              onChange={handleChangeValue}
              name="password"
              value={valueRegister.password}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please input your Password!",
              },
            ]}
          >
            <Input
              onChange={handleChangeValue}
              name="confirmPassword"
              value={valueRegister.confirmPassword}
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Comfirm Password"
            />
          </Form.Item>
          <Form.Item>
            <div className="flex-btn-login">
              <button
                onClick={handleRegister}
                type="submit"
                className="cssbuttons-io-button"
              >
                <span style={{ textAlign: "center" }}>Sign Up</span>
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
              <Link to={"/login"}>
                Sign In <i className="fa-solid fa-arrow-right-long"></i>
              </Link>
            </p>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
