import React from "react";
import { Tabs } from "antd";

import "./Setting.css";

import FormEditProfile from "../../../components/Home/FormEditProfile";

export default function Setting() {
  const { TabPane } = Tabs;
  return (
    <div>
      <Tabs tabPosition="left" className="tabs-setting">
        <TabPane tab="Editar Perfil" key="1">
          <FormEditProfile className="tabs-option-content" />
        </TabPane>
        <TabPane tab="Cambiar Contraseña" key="2">
          Content of Tab 2
        </TabPane>
        <TabPane tab="Demas" key="3">
          Content of Tab 3
        </TabPane>
      </Tabs>
    </div>
  );
}
