import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Navbar as NavbarANT,
  Container,
  Nav,
  Image,
  NavDropdown,
} from "react-bootstrap";
import { AiOutlineHome, AiOutlineSetting } from "react-icons/ai";
import { FaRegBookmark, FaRegUserCircle, FaRegCompass } from "react-icons/fa";
import { FiHeart, FiSend } from "react-icons/fi";
import { Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

//funciones importante
import { getAvatarApi, getUserIdApi } from "../../../api/user";
import { logout } from "../../../api/auth";

import "./Navbar.css";

//images
import LetraImg from "../../../assets/img/png/letra-instagram.png";
import NoAvatar from "../../../assets/img/png/avatar.png";

export default function Navbar(props) {
  const { person, reload, setReload } = props;
  const { Brand } = NavbarANT;

  const [userData, setUserData] = useState({});
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    const idPerson = person.id;
    getUserIdApi(idPerson).then((response) => {
      setUserData(response.user);
    });
    setReload(false);
  }, [reload]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (userData.avatar) {
      getAvatarApi(userData.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [setReload, userData]);

  const logoutUser = () => {
    logout();
    window.location.reload();
  };

  return (
    <div>
      <NavbarANT
        expand="lg"
        variant="light"
        bg="light"
        fixed="top"
        className="navegacion"
      >
        <Container>
          <Brand className="title-navegacion">
            <Link to="/home">
              <Image src={LetraImg} fluid className="img-letra3" />
            </Link>
          </Brand>
          <div className="direcciones justify-content-center pl-5">
            <Input placeholder="Buscar" prefix={<SearchOutlined />} />
          </div>
          <div className="opciones justify-content-end">
            <Nav>
              <Link to="/home" className="active first-item">
                <AiOutlineHome />
              </Link>
              <Link to="/home/direct" className="active">
                <FiSend />
              </Link>
              <Link to="/home/explore" className="active">
                <FaRegCompass />
              </Link>
              <Link to="/home" className="active">
                <FiHeart />
              </Link>

              <NavDropdown
                alignRight
                title={
                  <Image
                    src={avatar ? avatar : NoAvatar}
                    roundedCircle
                    thumbnail
                    className="img-profile"
                  />
                }
                className="basic-nav-dropdown"
              >
                <Link to="/home/profile" className="active p-2">
                  <FaRegUserCircle /> Perfil
                </Link>
                <Link to="/home/saved" className="active p-2">
                  <FaRegBookmark /> Salvados
                </Link>
                <Link to="/home/setting" className="active p-2">
                  <AiOutlineSetting /> Configuración
                </Link>
                <NavDropdown.Divider />
                <span
                  onClick={logoutUser}
                  className="active p-2 btn-cerrar-sesion"
                >
                  Cerrar Sesión
                </span>
              </NavDropdown>
            </Nav>
          </div>
        </Container>
      </NavbarANT>
    </div>
  );
}
