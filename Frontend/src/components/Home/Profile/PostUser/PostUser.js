import React from "react";
import { Row, Col, Card, Button, Image } from "react-bootstrap";

import "./PostUser.css";

import ImageUser from "../../../../assets/img/png/subirImagen.png";

export default function PostUser() {
  return (
    <div>
      <Row>
        <Col lg={4}>
          <Card>
            <Card.Body>
              <Image src={ImageUser} alt="image" fluid />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
