import React from "react";
import { Link } from "react-router-dom";
import {
  Navbar as NavbarANT,
  Container,
  Nav,
  Image,
  NavDropdown,
  Button,
  Row,
  Col,
} from "react-bootstrap";

import "./Navbar.css";

//images
import LetraImg from "../../../assets/img/png/letra-instagram.png";
import NoAvatar from "../../../assets/img/png/avatar.png";

export default function Navbar() {
  const { Brand, Toggle, Collapse } = NavbarANT;

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
          <div className="direcciones justify-content-center">hola</div>
          <div className="direcciones justify-content-end">hola</div>
        </Container>
      </NavbarANT>
    </div>
  );
}
