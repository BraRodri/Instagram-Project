import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, Avatar, notification } from "antd";
import { getAvatarApi, updatePasswordApi } from "../../../../api/user";

import "./FormUpdatePassword.css";
import NoAvatar from "../../../../assets/img/png/avatar.png";

export default function FormUpdatePassword(props) {
  const { userData, settingRoload, setSettingRoload } = props;
  const [datos, setDatos] = useState({});
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (userData.avatar) {
      getAvatarApi(userData.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [settingRoload, userData]);

  const actualizarContraseña = (e) => {
    e.preventDefault();

    let userUpdate = datos;
    const repeatPassword2 = userUpdate.newRepeatPassword;

    if (userUpdate.newPassword || userUpdate.newRepeatPassword) {
      if (userUpdate.newPassword !== userUpdate.newRepeatPassword) {
        notification["error"]({
          message: "Las nuevas contraseñas tienen que ser iguales.",
        });
        return;
      } else {
        delete userUpdate.newRepeatPassword;
      }
    }

    updatePasswordApi(userUpdate, userData._id)
      .then((result) => {
        if (!result.message) {
          notification["error"]({
            message: "La contraseña antigua es incorrecta.",
          });
          userUpdate.newRepeatPassword = repeatPassword2;
        } else {
          notification["success"]({
            message: "Contraseña Actualizada Correctamente.",
          });
          setSettingRoload(true);
        }
      })
      .catch((err) => {
        notification["error"]({
          message: err.message,
        });
        userUpdate.newRepeatPassword = repeatPassword2;
      });

    console.log(datos);
  };

  const formItemLayout = {
    labelCol: {
      xs: { span: 22 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 22 },
      sm: { span: 12 },
    },
  };

  const tailLayout = {
    wrapperCol: { offset: 8, span: 12 },
  };

  return (
    <div className="div-form-edit">
      <Row className="div-form-edit-foto-info">
        <Col sm={8} className="div-form-edit-foto-info-foto">
          <Avatar size={44} src={avatar ? avatar : NoAvatar} />
        </Col>
        <Col sm={12} className="div-form-edit-foto-info-info">
          <h4>{userData.username}</h4>
        </Col>
      </Row>
      <Form
        {...formItemLayout}
        name="updatePassword"
        className="form-edit-profile"
        onSubmitCapture={actualizarContraseña}
        scrollToFirstError
      >
        <Form.Item
          name="oldPassword"
          label="Antigua Contraseña"
          rules={[
            {
              required: true,
              message: "Por favor, este campo es requerido!",
            },
          ]}
        >
          <Input.Password
            name="oldPassword"
            value={datos.oldPassword}
            onChange={(e) =>
              setDatos({ ...datos, oldPassword: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item
          name="newPassword"
          label="Nueva Contraseña"
          rules={[
            {
              required: true,
              message: "Por favor, este campo es requerido!",
            },
          ]}
        >
          <Input.Password
            name="newPassword"
            value={datos.newPassword}
            onChange={(e) =>
              setDatos({ ...datos, newPassword: e.target.value })
            }
            ref="idNewPassword"
          />
        </Form.Item>
        <Form.Item
          name="newRepeatPassword"
          label="Repetir Nueva Contraseña"
          rules={[
            {
              required: true,
              message: "Por favor, este campo es requerido!",
            },
          ]}
        >
          <Input.Password
            name="newRepeatPassword"
            value={datos.newRepeatPassword}
            onChange={(e) =>
              setDatos({ ...datos, newRepeatPassword: e.target.value })
            }
            ref="idNewRepeatPassword"
          />
        </Form.Item>
        <Form.Item {...tailLayout}>
          <Button type="primary" htmlType="submit">
            Cambiar Contraseña
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
