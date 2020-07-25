import React, { useState } from "react";
import { Image, Button, Modal } from "react-bootstrap";
import { FaRegComment, FaRegBookmark } from "react-icons/fa";
import { FiHeart, FiSend, FiMoreHorizontal } from "react-icons/fi";
import { List } from "antd";
import CreatePostForm from "../CreatePostForm";

import "./Post.css";

import ImgNoDisponible from "../../../assets/img/jpg/imagen-no-disponible.jpg";
import NoAvatar from "../../../assets/img/png/avatar.png";

export default function Post(props) {
  const { userData } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="all-post">
      <CreatePostForm dataUser={userData} />

      <div className="card mb-4">
        <div className="card-header">
          <div className="row align-items-center">
            <div className="col-8 ">
              <small className="text">
                <Image
                  src={NoAvatar}
                  roundedCircle
                  thumbnail
                  fluid
                  className="imgProfilePublicacion"
                />
                <span className="nombrePersonaPublicacion">
                  <strong>Username</strong>
                </span>
              </small>
            </div>
            <div className="col-4 ">
              <div className="text-right">
                <Button variant="link" onClick={handleShow}>
                  <FiMoreHorizontal />
                </Button>
                <Modal
                  show={show}
                  centered
                  onHide={handleClose}
                  className="modal-post-more"
                >
                  <Modal.Body>
                    <List bordered centered="true" className="list-modal-body">
                      <List.Item>
                        <Button variant="link">Ir al post</Button>
                      </List.Item>
                      <List.Item>
                        <Button variant="link" onClick={handleClose}>
                          Cancelar
                        </Button>
                      </List.Item>
                    </List>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </div>
        </div>
        <img src={ImgNoDisponible} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">
            <div className="row">
              <div className="col-6 btn-post">
                <Button variant="light">
                  <FiHeart className="icon-comen" />
                </Button>
                <Button variant="light">
                  <FaRegComment className="icon-comen" />
                </Button>
                <Button variant="light">
                  <FiSend />
                </Button>
              </div>
              <div className="col-6 btn-post text-right">
                <Button variant="light">
                  <FaRegBookmark className="icon-comen" />
                </Button>
              </div>
            </div>
          </h5>
          <p className="card-text">
            <strong>
              <span>1.000</span> likes
            </strong>
          </p>
          <p className="card-text">
            <strong>Username </strong>
            <span> descripcion post</span>
          </p>
        </div>
        <div className="card-footer">
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
      </div>
    </div>
  );
}
