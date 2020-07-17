import React from "react";
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

import "./Navbar.css";

//images
import LetraImg from "../../../assets/img/png/letra-instagram.png";
import NoAvatar from "../../../assets/img/png/avatar.png";

export default function Navbar() {
  const { Brand } = NavbarANT;

  return (
    <div>
      <NavbarANT
        expand="lg"
        variant="light"
        bg="light"
        sticky="top"
        className="navegacion"
      >
        <Container>
          <Brand className="title-navegacion">
            <Link to="/principal">
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
              <Link to="/direct" className="active">
                <FiSend />
              </Link>
              <Link to="/explore" className="active">
                <FaRegCompass />
              </Link>
              <Link to="/home" className="active">
                <FiHeart />
              </Link>

              <NavDropdown
                alignRight
                title={
                  <Image
                    src={NoAvatar}
                    roundedCircle
                    thumbnail
                    className="img-profile"
                  />
                }
                id="basic-nav-dropdown"
              >
                <Link to="/home/profile" className="active">
                  <FaRegUserCircle /> Profile
                </Link>
                <Link to="/home/profile" className="active">
                  <FaRegBookmark /> Saved
                </Link>
                <Link to="/home/profile" className="active">
                  <AiOutlineSetting /> Settings
                </Link>
                <NavDropdown.Divider />
                <Link to="/home/profile" className="active">
                  Log Out
                </Link>
              </NavDropdown>
            </Nav>
          </div>
        </Container>
      </NavbarANT>
    </div>
  );
}
