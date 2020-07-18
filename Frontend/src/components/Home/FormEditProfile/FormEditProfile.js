import React from "react";
import { Form, Input, Select, Button, Checkbox } from "antd";

import "./FormEditProfile.css";

export default function FormEditProfile() {
  const { Option } = Select;

  const formItemLayout = {
    labelCol: {
      xs: { span: 22 },
      sm: { span: 6 },
    },
    wrapperCol: {
      xs: { span: 22 },
      sm: { span: 12 },
    },
  };

  const tailLayout = {
    wrapperCol: { offset: 6, span: 12 },
  };

  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="54">+54</Option>
        <Option value="57">+57</Option>
        <Option value="56">+56</Option>
        <Option value="57">+57</Option>
        <Option value="58">+58</Option>
      </Select>
    </Form.Item>
  );

  return (
    <div className="div-form-edit">
      <Form
        {...formItemLayout}
        name="updateProfile"
        className="form-edit-profile"
        scrollToFirstError
      >
        <Form.Item
          name="name"
          label="Nombres"
          help="Ayude a las personas a descubrir su cuenta utilizando el nombre que le conoce: su nombre completo, apodo o nombre comercial."
          rules={[
            {
              required: true,
              message: "Por favor ingresar sus nombres!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="username"
          label="Username"
          rules={[
            {
              required: true,
              message: "Por favor ingresar su Username!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="website"
          className="input-para-info"
          label="Website"
          help="Informacion personal. Proporcione su información personal, incluso si la cuenta se utiliza para un negocio, una mascota u otra cosa. Esto no será parte de tu perfil público."
        >
          <Input placeholder="Website" />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "La entrada no es válida Correo electrónico",
            },
            {
              required: true,
              message: "Por favor ingresar su Email!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Celular"
          rules={[
            {
              required: true,
              message: "Por favor ingresar su numero de celular!",
            },
          ]}
        >
          <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item name="genero" label="Genero">
          <Select placeholder="Seleccione un genero!" allowClear>
            <Option value="male">Masculino</Option>
            <Option value="female">Femenino</Option>
            <Option value="other">Otro</Option>
          </Select>
        </Form.Item>

        <Form.Item {...tailLayout} name="remember" valuePropName="checked">
          <Checkbox>
            Incluya su cuenta cuando recomiende cuentas similares que la gente
            quiera seguir.
          </Checkbox>
        </Form.Item>

        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Guardar Cambios
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
