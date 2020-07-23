import React, { useEffect, useState } from "react";
import { Row, Col, Avatar, Button, notification } from "antd";
import { getAvatarApi, updateStateApi } from "../../../../api/user";
import { logout } from "../../../../api/auth";

import "./FormDeactivateAccount.css";
import NoAvatar from "../../../../assets/img/png/avatar.png";

export default function FormDeactivateAccount(props) {
  const { userData, settingRoload, setSettingRoload } = props;
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

  const logoutUser = () => {
    logout();
    window.location.reload();
  };

  const desactivateUser = () => {
    updateStateApi(userData._id, false)
      .then((response) => {
        notification["success"]({
          message: response,
        });
        setSettingRoload(true);
        logoutUser();
      })
      .catch((err) => {
        notification["error"]({
          message: err,
        });
      });
  };

  return (
    <div className="div-form-edit">
      <Row className="div-form-edit-foto-info">
        <Col sm={4} className="div-form-edit-foto-info-foto">
          <Avatar size={44} src={avatar ? avatar : NoAvatar} />
        </Col>
        <Col sm={16} className="div-form-edit-foto-info-info">
          <h4>{userData.username}</h4>
        </Col>
      </Row>
      <Row>
        <Col sm={4}></Col>
        <Col sm={16}>
          <h4>Desactivar Cuenta.</h4>
          <p>Cuando la cuenta esté desactivada:</p>
          <ul>
            <li>Nadie más podrá ver tu perfil.</li>
            <li>
              Es posible que cierta información (como los mensajes que enviaste
              a amigos) siga visible.
            </li>
            <li>
              Es posible que tus amigos sigan viendo tu nombre en su lista de
              amigos. Solo lo pueden ver tus amigos y solo en su lista de
              amigos.
            </li>
          </ul>
          <p>Al desactivar la cuenta, automaticamente cerraras sesión.</p>
          <br></br>
          <div>
            <span>
              Si, desactivar mi Cuenta{" "}
              <Button type="primary" danger onClick={desactivateUser}>
                {" "}
                Desactivar
              </Button>
            </span>
          </div>
        </Col>
      </Row>
    </div>
  );
}
