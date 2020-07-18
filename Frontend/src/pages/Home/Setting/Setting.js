import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { getUserIdApi } from "../../../api/user";

import "./Setting.css";

import FormEditProfile from "../../../components/Home/FormEditProfile";

export default function Setting(props) {
  const { TabPane } = Tabs;
  const { person, reload, setReload } = props;

  const [userData, setUserData] = useState({});

  useEffect(() => {
    const idPerson = person.id;
    getUserIdApi(idPerson).then((response) => {
      setUserData(response.user);
    });
    setReload(false);
  }, [reload]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Tabs tabPosition="left" className="tabs-setting">
        <TabPane tab="Editar Perfil" key="1">
          <FormEditProfile
            className="tabs-option-content"
            userData={userData}
            setReload={setReload}
          />
        </TabPane>
        <TabPane tab="Cambiar Contraseña" key="2">
          Content of Tab 2
        </TabPane>
        <TabPane tab="Desactivar Cuenta" key="3">
          Content of Tab 3
        </TabPane>
      </Tabs>
    </div>
  );
}