import React, { useState } from "react";
import { Form, Input, Divider, notification } from "antd";
import { singInApi } from "../../../api/user";

import "./FormRegister.css";

export default function FormRegister() {
  const [inputs, setInputs] = useState({});

  const changeForm = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    const result = await singInApi(inputs);
    if (!result.ok) {
      notification["error"]({
        message: result.message,
      });
    } else {
      notification["success"]({
        message: result.message,
      });
      resetForm();
    }
  };

  const resetForm = () => {
    const inputs = document.getElementsByTagName("input");

    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }

    setInputs({
      name: "",
      email: "",
      telephone: "",
      username: "",
      password: "",
      repeatPassword: "",
    });
  };

  return (
    <div className="register-form">
      <p className="text-center">
        Regístrate para ver fotos y videos de tus amigos.
      </p>
      <Divider plain>OR</Divider>
      <Form onChange={changeForm} onSubmitCapture={register}>
        <Form.Item
          name="name"
          rules={[
            {
              required: true,
              message: "Por favor, este campo es requerido!",
            },
          ]}
        >
          <Input name="name" placeholder="Nombres Completos" />
        </Form.Item>
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
          <Input name="email" placeholder="Correo Electronico" />
        </Form.Item>
        <Form.Item
          name="phone"
          rules={[
            {
              required: true,
              message: "Por favor, este campo es requerido!",
            },
          ]}
        >
          <Input type="tel" name="telephone" placeholder="Numero Celular" />
        </Form.Item>
        <Form.Item
          name="username"
          rules={[
            {
              required: true,
              message: "Por favor, este campo es requerido!",
            },
          ]}
        >
          <Input name="username" placeholder="Username" />
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
        <Form.Item
          name="repeatPassword"
          rules={[
            {
              required: true,
              message: "Por favor, este campo es requerido!",
            },
          ]}
          hasFeedback
        >
          <Input.Password
            name="repeatPassword"
            placeholder="Repetir Password"
          />
        </Form.Item>
        <input
          className="btn btn-primary btn-block mb-4"
          type="submit"
          value="Registarme"
        />
      </Form>
    </div>
  );
}
