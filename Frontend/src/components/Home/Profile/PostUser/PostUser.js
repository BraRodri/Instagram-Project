import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { FaHeart, FaComment } from "react-icons/fa";

import "./PostUser.css";

import ImageUser from "../../../../assets/img/png/subirImagen.png";
import ImageUserA from "../../../../assets/img/jpg/imagen-no-disponible.jpg";
import ImageUserB from "../../../../assets/img/png/avatar.png";

export default function PostUser() {
  return (
    <div>
      <Row className="row-card-post-profile">
        <Col lg={4} md={4} xs={4} className="col-card-post-profile">
          <Link to="/home/post/1">
            <Card className="card-post-profile">
              <Card.Img src={ImageUser} alt="image" />
              <div className="card-img-overlay d-flex flex-column justify-content-center">
                <p className="card-text oswald">
                  <span className="mr-4">
                    <FaHeart /> 1
                  </span>
                  <span>
                    <FaComment /> 2
                  </span>
                </p>
              </div>
            </Card>
          </Link>
        </Col>
        <Col lg={4} md={4} xs={4} className="col-card-post-profile">
          <Link to="/home/post/2">
            <Card className="card-post-profile">
              <Card.Img src={ImageUserA} alt="image" />
              <div className="card-img-overlay d-flex flex-column justify-content-center">
                <p className="card-text oswald">
                  <span className="mr-4">
                    <FaHeart /> 1
                  </span>
                  <span>
                    <FaComment /> 2
                  </span>
                </p>
              </div>
            </Card>
          </Link>
        </Col>
        <Col lg={4} md={4} xs={4} className="col-card-post-profile">
          <Card className="card-post-profile">
            <Card.Img src={ImageUserB} alt="image" />
            <div className="card-img-overlay d-flex flex-column justify-content-center">
              <p className="card-text oswald">
                <span className="mr-4">
                  <FaHeart /> 1
                </span>
                <span>
                  <FaComment /> 2
                </span>
              </p>
            </div>
          </Card>
        </Col>
        <Col lg={4} md={4} xs={4} className="col-card-post-profile">
          <Card className="card-post-profile">
            <Card.Img src={ImageUser} alt="image" />
            <div className="card-img-overlay d-flex flex-column justify-content-center">
              <p className="card-text oswald">
                <span className="mr-4">
                  <FaHeart /> 1
                </span>
                <span>
                  <FaComment /> 2
                </span>
              </p>
            </div>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
