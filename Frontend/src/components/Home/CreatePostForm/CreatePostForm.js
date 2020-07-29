import React, { useEffect, useState, useCallback } from "react";
import { Card, Button, Modal, Alert } from "react-bootstrap";
import { Avatar, Button as BTNANTD, notification } from "antd";
import { useDropzone } from "react-dropzone";
import { addPostApi, uploadImageApi } from "../../../api/post";
import Moment from "moment";

import "./CreatePostForm.css";

import SubirImg from "../../../assets/img/png/subirImagen.png";

export default function CreatePostForm(props) {
  const { dataUser } = props;

  const [avatar, setAvatar] = useState(null);
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState({});
  const [showAlert, setShowAlert] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, image: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const createPost = (e) => {
    e.preventDefault();

    let postCreate = userData;

    if (!postCreate.description) {
      setShowAlert(true);
      return;
    }

    if (typeof postCreate.image === "object") {
      uploadImageApi(postCreate.image).then((response) => {
        postCreate.image = response.nameImage;

        const HoraHoy = Moment().format("HH:mm:ss");
        const FechaHoy = Moment().format("YYYY-MM-DD HH:mm:ss");
        postCreate.date = FechaHoy;
        postCreate.hour = HoraHoy;
        addPostApi(postCreate, dataUser._id).then((result) => {
          handleClose();
          notification["success"]({
            message: result.message,
          });
          setAvatar(null);
        });
      });
    } else {
      setShowAlert(true);
    }
  };

  return (
    <div className="mb-5">
      <Card>
        <Card.Body>
          <div className="row">
            <div className="col-lg-8 info-texto-crear">
              <Card.Title>Crea una nueva publicación</Card.Title>
            </div>
            <div className="col button-a-la-izquierda">
              <Button variant="primary" onClick={handleShow}>
                Crear
              </Button>
              <Modal show={show} centered onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Crear Publicación</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <FormPost
                    userData={userData}
                    setUserData={setUserData}
                    avatar={avatar}
                    setAvatar={setAvatar}
                    createPost={createPost}
                    handleClose={handleClose}
                    showAlert={showAlert}
                    setShowAlert={setShowAlert}
                  />
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
  const {
    userData,
    setUserData,
    avatar,
    setAvatar,
    createPost,
    handleClose,
    showAlert,
    setShowAlert,
  } = props;
  return (
    <>
      <Alert
        show={showAlert}
        variant="danger"
        onClose={() => setShowAlert(false)}
        dismissible
      >
        <Alert.Heading>Ocurrio un Error!</Alert.Heading>
        <p>La descripción y la imagen son obligatorios!.</p>
      </Alert>
      <form name="form-post" onSubmitCapture={createPost}>
        <h6>¿Que deseas publicar el dia de hoy?</h6>
        <div className="form-group">
          <textarea
            className="form-control"
            placeholder="Descripción de la publicación..."
            rows="3"
            onChange={(e) =>
              setUserData({ ...userData, description: e.target.value })
            }
          />
        </div>
        <UpdateImage avatar={avatar} setAvatar={setAvatar} />
        <div className="mt-4 button-a-la-izquierda">
          <BTNANTD type="dashed" className="mr-3" onClick={handleClose}>
            Cancelar
          </BTNANTD>
          <BTNANTD type="primary" htmlType="submit">
            Publicar
          </BTNANTD>
        </div>
      </form>
    </>
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
    <div {...getRootProps()} className="text-center">
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar shape="square" size={420} src={SubirImg} />
      ) : (
        <Avatar
          shape="square"
          size={420}
          src={avatarUrl ? avatarUrl : SubirImg}
        />
      )}
    </div>
  );
}
