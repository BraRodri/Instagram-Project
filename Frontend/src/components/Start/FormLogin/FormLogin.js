import React, { useState } from "react";
import { Form, Input, Divider, notification } from "antd";
import { loginApi } from "../../../api/user";

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

    console.log(inputs);
    const resultado = await loginApi(inputs);
    console.log(resultado);

    if (resultado.message) {
      notification["error"]({
        message: resultado.message,
      });
    } else {
      notification["success"]({
        message: "Login Exitoso",
      });

      //window.location.href = "/home";
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
