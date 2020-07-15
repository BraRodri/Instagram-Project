import React from "react";
import { Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import FormRegister from "../../../components/Start/FormRegister";

import "./Register.css";

import LetraInstagram from "../../../assets/img/png/letra-instagram.png";

export default function Register() {
  return (
    <div>
      <Row>
        <Col lg={3} md={12}></Col>
        <Col lg={6} md={12}>
          <div className="registroContent mb-4">
            <div className="primeroR">
              <div className="text-center">
                <Image src={LetraInstagram} fluid className="img-letra2" />
              </div>
              <div className="p-4">
                <FormRegister />
              </div>
            </div>
            <div className="primeroR mt-4 p-3 text-center">
              ¿Ya tienes Cuenta? <Link to="/">Inicia Sesión</Link>
            </div>
          </div>
        </Col>
        <Col lg={3} md={12}></Col>
      </Row>
    </div>
  );
}
