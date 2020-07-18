import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import FormLogin from "../../../components/Start/FormLogin";
import { getAccessTokenApi } from "../../../api/auth";

import "./Login.css";

//images
import UserInterface from "../../../assets/img/svg/user_interface_.svg";
import LetraInstagram from "../../../assets/img/png/letra-instagram.png";

export default function Login() {
  if (getAccessTokenApi()) {
    return <Redirect to="/home" />;
  }
  return (
    <div>
      <Row>
        <Col lg={6} md={12}>
          <Image src={UserInterface} fluid className="img-login" />
        </Col>
        <Col lg={6} md={12}>
          <div className="primeroContent">
            <div className="primero">
              <div className="text-center">
                <Image src={LetraInstagram} fluid className="img-letra" />
              </div>
              <div className="p-4">
                <FormLogin />
              </div>
            </div>
            <div className="primero mt-4 p-3 text-center">
              ¿No tienes cuenta todavia? <Link to="/register">Registrate</Link>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
