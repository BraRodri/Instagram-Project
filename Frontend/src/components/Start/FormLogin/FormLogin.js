import React, { useState } from "react";
import { Form, Input, Divider, notification } from "antd";
import { loginApi } from "../../../api/user";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";

export default function FormLogin() {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const login = async (e) => {
    e.preventDefault();
    const resultado = await loginApi(inputs);

    if (resultado.message) {
      notification["error"]({
        message: resultado.message,
      });
    } else {
      const { accessToken, refreshToken } = resultado;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);

      notification["success"]({
        message: "Login Exitoso",
      });

      window.location.href = "/home";
    }
  };

  return (
    <div className="login-form">
      <Form onChange={changeForm} onSubmitCapture={login}>
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "Dirección de correo electronico no valido!",
            },
            {
              required: true,
              message: "Por favor, este campo es requerido!",
            },
          ]}
        >
          <Input name="email" placeholder="Email" />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Por favor, este campo es requerido!",
            },
          ]}
          hasFeedback
        >
          <Input.Password name="password" placeholder="Password" />
        </Form.Item>

        <input
          className="btn btn-primary btn-block"
          type="submit"
          value="Log in"
        />
      </Form>

      <Divider plain>OR</Divider>
    </div>
  );
}
