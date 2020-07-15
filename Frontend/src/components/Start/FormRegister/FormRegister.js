import React, { useState } from "react";
import { Form, Input, Divider } from "antd";

import "./FormRegister.css";

export default function FormRegister() {
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

  const register = (e) => {
    e.preventDefault();
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
          <Input type="tel" name="phone" placeholder="Numero Celular" />
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
          <Input name="text" placeholder="Username" />
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
