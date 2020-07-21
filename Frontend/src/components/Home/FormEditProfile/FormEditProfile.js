import React, { useState, useEffect, useCallback } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Checkbox,
  Avatar,
  notification,
} from "antd";
import { useDropzone } from "react-dropzone";

import {
  getAvatarApi,
  uploadAvatarApi,
  updateUserApi,
} from "../../../api/user";

import NoAvatar from "../../../assets/img/png/avatar.png";

import "./FormEditProfile.css";

export default function FormEditProfile(props) {
  const { userData, setReload } = props;
  const [datos, setDatos] = useState({});
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    setDatos({
      name: userData.name,
      email: userData.email,
      telephone: userData.telephone,
      username: userData.username,
      avatar: userData.avatar,
      state: userData.state,
      gender: userData.gender,
      website: userData.website,
      password: userData.password,
    });
  }, [userData]);

  useEffect(() => {
    if (userData.avatar) {
      getAvatarApi(userData.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [userData]);

  useEffect(() => {
    if (avatar) {
      setDatos({ ...datos, avatar: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const updateUser = (e) => {
    e.preventDefault();

    let userUpdate = datos;
    console.log(userUpdate);

    if (
      !userUpdate.name ||
      !userUpdate.username ||
      !userUpdate.email ||
      !userUpdate.telephone
    ) {
      notification["error"]({
        message: "El nombre, username, email y celular son obligatorios.",
      });
      return;
    }

    console.log(userUpdate);

    if (typeof userUpdate.avatar === "object") {
      uploadAvatarApi(userUpdate.avatar, userData._id).then((response) => {
        userUpdate.avatar = response.avatarName;
        updateUserApi(userUpdate, userData._id).then((result) => {
          notification["success"]({
            message: result.message,
          });
          setReload(true);
        });
      });
    } else {
      updateUserApi(userUpdate, userData._id).then((result) => {
        notification["success"]({
          message: result.message,
        });
        setReload(true);
      });
    }
  };

  console.log(datos);

  return (
    <div className="div-form-edit">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <Formulario datos={datos} setDatos={setDatos} updateUser={updateUser} />
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
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
