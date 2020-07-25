import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col } from "react-bootstrap";
import { AiOutlineSetting } from "react-icons/ai";
import { MdPersonPin, MdFilterFrames } from "react-icons/md";
import { FaTh, FaBookmark } from "react-icons/fa";
import { Tabs, Avatar } from "antd";

//funciones importante
import { getAvatarApi, getUserIdApi } from "../../../api/user";

import PostUser from "../../../components/Home/Profile/PostUser";

import "./Profile.css";

import NoAvatar from "../../../assets/img/png/avatar.png";

export default function Profile(props) {
  const { TabPane } = Tabs;
  const { person } = props;

  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const idPerson = person.id;
    getUserIdApi(idPerson).then((response) => {
      setUserData(response.user);
    });
  }, [person]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (userData.avatar) {
      getAvatarApi(userData.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [userData]);

  return (
    <div>
      <div className="top-profile">
        <Row>
          <Col lg={4} md={2} xs={4} className="text-center">
            <Avatar size={140} src={avatar ? avatar : NoAvatar} />
          </Col>
          <Col lg={8} md={8} xs={8}>
            <Row className="div-top-first">
              <Col lg={4}>
                <h2 className="mr-5">{userData.username}</h2>
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
                  <strong>0</strong> Post
                </li>
                <li>
                  <strong>0</strong> Seguidores
                </li>
                <li>
                  <strong>0</strong> Siguiendo
                </li>
              </ul>
            </div>
            <div className="lg-mostrar-pantalla">
              <h6>
                <strong>{userData.name}</strong>
              </h6>
            </div>
          </Col>
          <Col className="xs-movil-mostrar mt-4">
            <div>
              <h6>
                <strong>{userData.name}</strong>
              </h6>
            </div>
            <div>
              <ul id="lista-profile-movil">
                <li>
                  <strong>0</strong> <p>Post</p>
                </li>
                <li>
                  <strong>0</strong> <p>Seguidores</p>
                </li>
                <li>
                  <strong>0</strong> <p>Siguiendo</p>
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
                <PostUser />
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
