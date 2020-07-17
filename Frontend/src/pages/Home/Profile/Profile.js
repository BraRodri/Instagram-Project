import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";
import { AiOutlineSetting } from "react-icons/ai";
import { MdPersonPin, MdFilterFrames } from "react-icons/md";
import { FaTh, FaBookmark } from "react-icons/fa";
import { Tabs } from "antd";

import "./Profile.css";

import NoAvatar from "../../../assets/img/png/avatar.png";

export default function Profile() {
  const { TabPane } = Tabs;

  return (
    <div>
      <div className="top-profile">
        <Row>
          <Col lg={4} md={2} xs={4} className="text-center">
            <Image src={NoAvatar} roundedCircle thumbnail fluid />
          </Col>
          <Col lg={8} md={8} xs={8}>
            <Row className="div-top-first">
              <Col lg={4}>
                <h2 className="mr-5">Username</h2>
              </Col>
              <Col lg={8} className="div-top-first-btn">
                <Link to="/home/setting" className="btn-edit mr-4">
                  Editar Perfil
                </Link>
                <Link to="/home/setting" className="btn-edit-profile">
                  <AiOutlineSetting />
                </Link>
              </Col>
            </Row>
            <div>
              <ul id="lista-profile">
                <li>
                  <strong>10</strong> Post
                </li>
                <li>
                  <strong>10</strong> Seguidores
                </li>
                <li>
                  <strong>10</strong> Siguiendo
                </li>
              </ul>
            </div>
            <div className="lg-mostrar-pantalla">
              <h6>
                <strong>Nombre Completo</strong>
              </h6>
            </div>
          </Col>
          <Col className="xs-movil-mostrar mt-4">
            <div>
              <h6>
                <strong>Nombre Completo</strong>
              </h6>
            </div>
            <div>
              <ul id="lista-profile-movil">
                <li>
                  <strong>10</strong> <p>Post</p>
                </li>
                <li>
                  <strong>10</strong> <p>Seguidores</p>
                </li>
                <li>
                  <strong>10</strong> <p>Siguiendo</p>
                </li>
              </ul>
            </div>
          </Col>
        </Row>
      </div>
      <div className="bottom-profile">
        <Row>
          <Col lg={12}>
            <Tabs defaultActiveKey="1" centered tabPosition="top">
              <TabPane
                tab={
                  <span>
                    <FaTh /> POST
                  </span>
                }
                key="1"
              >
                Content of Tab Pane 1
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <MdFilterFrames /> IGTV
                  </span>
                }
                key="2"
              >
                Content of Tab Pane 2
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <FaBookmark /> SALVADOS
                  </span>
                }
                key="3"
              >
                Content of Tab Pane 3
              </TabPane>
              <TabPane
                tab={
                  <span>
                    <MdPersonPin /> ETIQUETAS
                  </span>
                }
                key="4"
              >
                Content of Tab Pane 4
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </div>
    </div>
  );
}
