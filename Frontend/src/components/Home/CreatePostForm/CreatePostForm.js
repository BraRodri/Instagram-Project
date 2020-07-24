import React, { useEffect, useState, useCallback } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import { Avatar } from "antd";
import { useDropzone } from "react-dropzone";

import "./CreatePostForm.css";

import SubirImg from "../../../assets/img/png/subirImagen.png";

export default function CreatePostForm() {
  const [avatar, setAvatar] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (avatar) {
      setAvatar(avatar.file);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  console.log(avatar);

  return (
    <div className="mb-5">
      <Card>
        <Card.Body>
          <div className="row">
            <div className="col-lg-8 info-texto-crear">
              <Card.Title>Crea una nueva publicación</Card.Title>
            </div>
            <UpdateImage avatar={avatar} setAvatar={setAvatar} />
            <div className="col button-a-la-izquierda">
              <Button variant="primary" onClick={handleShow}>
                Crear
              </Button>

              <Modal show={show} centered onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Crear Publicación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <FormPost />
                </Modal.Body>
              </Modal>
            </div>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}

function FormPost(props) {
  return (
    <form>
      <h5>¿Que deseas publicar el dia de hoy?</h5>
      <div className="form-group">
        <textarea
          className="form-control"
          placeholder="Descripción de la publicación..."
          rows="3"
        />
      </div>
    </form>
  );
}

function UpdateImage(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar shape="square" size={50} src={SubirImg} />
      ) : (
        <Avatar
          shape="square"
          size={50}
          src={avatarUrl ? avatarUrl : SubirImg}
        />
      )}
    </div>
  );
}
