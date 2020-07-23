import React, { useState, useEffect } from "react";
import { Tabs } from "antd";
import { getUserIdApi } from "../../../api/user";

import "./Setting.css";

import FormEditProfile from "../../../components/Home/Setting/FormEditProfile";
import FormUpdatePassword from "../../../components/Home/Setting/FormUpdatePassword";
import FormDeactivateAccount from "../../../components/Home/Setting/FormDeactivateAccount";

export default function Setting(props) {
  const { TabPane } = Tabs;
  const { person, reload, setReload } = props;

  const [userData, setUserData] = useState({});
  const [settingRoload, setSettingRoload] = useState(false);

  useEffect(() => {
    const idPerson = person.id;
    getUserIdApi(idPerson).then((response) => {
      setUserData(response.user);
    });
    setSettingRoload(false);
    setReload(false);
  }, [reload, settingRoload]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="css-en-setting">
      <Tabs tabPosition="left" className="tabs-setting">
        <TabPane tab="Editar Perfil" key="1">
          <FormEditProfile
            className="tabs-option-content"
            userData={userData}
            setReload={setReload}
            setSettingRoload={setSettingRoload}
          />
        </TabPane>
        <TabPane tab="Cambiar Contraseña" key="2">
          <FormUpdatePassword
            className="tabs-option-content"
            userData={userData}
            settingRoload={settingRoload}
            setSettingRoload={setSettingRoload}
          />
        </TabPane>
        <TabPane tab="Desactivar Cuenta" key="3">
          <FormDeactivateAccount
            className="tabs-option-content"
            userData={userData}
            settingRoload={settingRoload}
            setSettingRoload={setSettingRoload}
          />
        </TabPane>
      </Tabs>
    </div>
  );
}
