import React, { useState, useEffect } from "react";
import { Form, Input, Select, Button, Checkbox } from "antd";

import "./FormEditProfile.css";

export default function FormEditProfile(props) {
  const { userData, setReload } = props;
  const [datos, setDatos] = useState(userData);

  useEffect(() => {
    setDatos({
      id: userData._id,
      name: userData.name,
      email: userData.email,
      telephone: userData.telephone,
      username: userData.username,
      avatar: userData.avatar,
      gender: userData.gender,
      website: userData.website,
    });
  }, [userData]);

  const updateUser = (e) => {
    e.preventDefault();
    console.log(datos);
  };

  return (
    <div className="div-form-edit">
      <Formulario datos={datos} setDatos={setDatos} updateUser={updateUser} />
    </div>
  );
}

function Formulario(props) {
  const { datos, setDatos, updateUser } = props;
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

  return (
    <Form
      {...formItemLayout}
      name="updateProfile"
      className="form-edit-profile"
      onSubmitCapture={updateUser}
      scrollToFirstError
    >
      <Form.Item
        label="Nombres"
        rules={[
          {
            required: true,
            message: "Por favor ingresar sus nombres!",
          },
        ]}
        help="Ayude a las personas a descubrir su cuenta utilizando el nombre que le conoce: su nombre completo, apodo o nombre comercial."
      >
        <Input
          name="name"
          value={datos.name}
          onChange={(e) => setDatos({ ...datos, name: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        label="Username"
        rules={[
          {
            required: true,
            message: "Por favor ingresar su Username!",
          },
        ]}
      >
        <Input
          name="username"
          value={datos.username}
          onChange={(e) => setDatos({ ...datos, username: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        className="input-para-info"
        label="Website"
        help="Informacion personal. Proporcione su información personal, incluso si la cuenta se utiliza para un negocio, una mascota u otra cosa. Esto no será parte de tu perfil público."
      >
        <Input name="website" value={datos.website} placeholder="Website" />
      </Form.Item>

      <Form.Item
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
        <Input
          name="email"
          value={datos.email}
          onChange={(e) => setDatos({ ...datos, email: e.target.value })}
        />
      </Form.Item>

      <Form.Item
        label="Celular"
        rules={[
          {
            required: true,
            message: "Por favor ingresar su numero de celular!",
          },
        ]}
      >
        <Input
          name="telephone"
          value={datos.telephone}
          onChange={(e) => setDatos({ ...datos, telephone: e.target.value })}
          style={{ width: "100%" }}
        />
      </Form.Item>

      <Form.Item label="Genero">
        <Select
          name="gender"
          value={datos.gender}
          placeholder="Seleccione un genero!"
          onChange={(e) => setDatos({ ...datos, gender: e })}
          allowClear
        >
          <Option value="Masculino">Masculino</Option>
          <Option value="Femenino">Femenino</Option>
          <Option value="Otro">Otro</Option>
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
  );
}
