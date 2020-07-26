import React from "react";
import { useParams } from "react-router-dom";
import { Container, Image, Button } from "react-bootstrap";
import { Row, Col, Avatar } from "antd";
import { FaRegComment, FaRegBookmark } from "react-icons/fa";
import { FiHeart, FiSend } from "react-icons/fi";

import "./Post.css";

import NoImage from "../../../assets/img/jpg/imagen-no-disponible.jpg";
import NoAvatar from "../../../assets/img/png/avatar.png";

export default function Post() {
  let { idPost } = useParams();
  console.log(idPost);
  return (
    <Container className="mb-5">
      <Row className="bg-white border rounded">
        <Col lg={15} xs={24} className="post-col-img">
          <Image src={NoImage} fluid />
        </Col>
        <Col lg={9} xs={24} className="border-left">
          {/* avatar y username del post*/}
          <div className="p-3 border-bottom">
            <Row>
              <Col lg={4} className="text-center">
                <Avatar size={35} src={NoAvatar} />
              </Col>
              <Col lg={20} className="pt-2 pl-2">
                <h6>Username</h6>
              </Col>
            </Row>
          </div>
          {/* info del post y todos los comentarios*/}
          <div className="anyClass p-3">
            <Row>
              <Col lg={4} className="text-center">
                <Avatar size={35} src={NoAvatar} />
              </Col>
              <Col lg={20} className="pt-2 pl-2">
                <h6>descripción del post</h6>
              </Col>
            </Row>

            {/* todos los comentarios*/}
            <div>
              <div className="mt-3 mb-3">
                <Row>
                  <Col lg={4} className="text-center">
                    <Avatar size={35} src={NoAvatar} />
                  </Col>
                  <Col lg={20} className="pt-2 pl-2">
                    <h6>comentario</h6>
                  </Col>
                </Row>
              </div>
              <div className="mt-3 mb-3">
                <Row>
                  <Col lg={4} className="text-center">
                    <Avatar size={35} src={NoAvatar} />
                  </Col>
                  <Col lg={20} className="pt-2 pl-2">
                    <h6>comentario</h6>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
          {/* botones y likes del post*/}
          <div className="pt-2 border-top border-bottom">
            <div className="row">
              <div className="col-8 btn-post">
                <Button variant="light" className="pl-3">
                  <FiHeart className="icon-comen" />
                </Button>
                <Button variant="light">
                  <FaRegComment className="icon-comen" />
                </Button>
                <Button variant="light">
                  <FiSend />
                </Button>
              </div>
              <div className="col-4 btn-post text-right">
                <Button variant="light">
                  <FaRegBookmark className="icon-comen" />
                </Button>
              </div>
            </div>
            <div className="pt-2 pl-3">
              <h6>
                <strong>1.000 likes</strong>
              </h6>
              <p className="font-hours-public-post">Hace 4 Horas</p>
            </div>
          </div>
          {/* form para agg un comentario*/}
          <div className="form-add-coment-post pt-2 pb-2">
            <form>
              <div className="form-row">
                <div className="col-9">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Agregar un comentario..."
                  />
                </div>
                <div className="col-3">
                  <input
                    type="submit"
                    className="form-control btn-submit-post"
                    value="Enviar"
                  />
                </div>
              </div>
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
