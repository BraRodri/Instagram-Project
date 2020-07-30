import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Image, Button, NavDropdown } from "react-bootstrap";
import { Row, Col, Avatar, Modal as ModalAntd, notification } from "antd";
import { FaRegComment, FaRegBookmark } from "react-icons/fa";
import { FiSend, FiMoreHorizontal } from "react-icons/fi";
import Moment from "moment";
import UpdateLike from "../../../components/Home/PostOne/UpdateLike";

import {
  getPostIdApi,
  getImagePostApi,
  deletePostApi,
} from "../../../api/post";
import { getAvatarApi, getUserIdApi } from "../../../api/user";

import "./Post.css";

import NoImage from "../../../assets/img/jpg/imagen-no-disponible.jpg";
import NoAvatar from "../../../assets/img/png/avatar.png";

const { confirm } = ModalAntd;

export default function Post(props) {
  const { person } = props;
  let { idPost } = useParams();

  const [datos, setDatos] = useState({});
  const [reload, setReload] = useState(false);
  const [imagePost, setImagePost] = useState(null);

  useEffect(() => {
    getPostIdApi(idPost).then((response) => {
      setDatos(response.post);
    });
    setReload(false);
  }, [idPost, reload]);

  useEffect(() => {
    if (datos.image) {
      getImagePostApi(datos.image).then((response) => {
        setImagePost(response);
      });
    } else {
      setImagePost(null);
    }
  }, [datos]);

  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const idPerson = datos.idUser;
    if (idPerson) {
      getUserIdApi(idPerson).then((response) => {
        setUserData(response.user);
      });
    } else {
      setUserData({});
    }
    setReload(false);
  }, [reload, datos]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (userData.avatar) {
      getAvatarApi(userData.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [userData]);

  const mObtenerDiferenciaFecha = () => {
    const fechaVieja = datos.date;
    const fechaInicio = Moment().format("YYYY-MM-DD HH:mm:ss");

    const newDiferentMinutes = Moment(fechaInicio).diff(fechaVieja, "minutes");
    const newDiferentHours = Moment(fechaInicio).diff(fechaVieja, "Hours");
    const newDiferentDays = Moment(fechaInicio).diff(fechaVieja, "days");
    const newDiferentMonth = Moment(fechaInicio).diff(fechaVieja, "months");

    let fechaDefinitiva = "";

    if (newDiferentMinutes <= 60) {
      if (newDiferentMinutes === 1) {
        fechaDefinitiva = `Hace ${newDiferentMinutes} minuto.`;
      } else {
        fechaDefinitiva = `Hace ${newDiferentMinutes} minutos.`;
      }
    } else if (newDiferentHours <= 24) {
      if (newDiferentHours === 1) {
        fechaDefinitiva = `Hace ${newDiferentHours} hora.`;
      } else {
        fechaDefinitiva = `Hace ${newDiferentHours} horas.`;
      }
    } else if (newDiferentDays <= 30) {
      if (newDiferentDays === 1) {
        fechaDefinitiva = `Hace ${newDiferentDays} dia.`;
      } else {
        fechaDefinitiva = `Hace ${newDiferentDays} dias.`;
      }
    } else {
      if (newDiferentMonth === 1) {
        fechaDefinitiva = `Hace ${newDiferentMonth} mes.`;
      } else {
        fechaDefinitiva = `Hace ${newDiferentMonth} meses.`;
      }
    }

    return <span>{fechaDefinitiva}</span>;
  };

  return (
    <Container className="mb-5">
      <Row className="bg-white border rounded">
        <Col lg={15} xs={24} className="post-col-img">
          <Image src={imagePost ? imagePost : NoImage} fluid />
        </Col>
        <Col lg={9} xs={24} className="border-left">
          {/* avatar y username del post*/}
          <div className="p-3 border-bottom">
            <InfoDelUserPost
              person={person}
              datos={datos}
              avatar={avatar}
              userData={userData}
            />
          </div>
          {/* info del post y todos los comentarios*/}
          <div className="anyClass p-3">
            <DescripcionDelUserPost
              datos={datos}
              avatar={avatar}
              userData={userData}
            />

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
                <UpdateLike
                  idPost={idPost}
                  person={person}
                  setReload={setReload}
                />
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
                <strong>{datos.likes ? datos.likes : 0} likes</strong>
              </h6>
              <p className="font-hours-public-post">
                {mObtenerDiferenciaFecha()}
              </p>
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

function InfoDelUserPost(props) {
  const { person, datos, avatar, userData } = props;

  const showDeleteConfirm = () => {
    confirm({
      title: "Eliminando Publicación",
      content: `¿Estas seguro que quieres eliminar esta publicación?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deletePostApi(datos._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
            window.location.href = "/home";
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
          });
      },
    });
  };

  const validarUserLogin = () => {
    if (person.id === userData._id) {
      return (
        <NavDropdown
          alignRight
          title={<FiMoreHorizontal />}
          className="basic-nav-dropdown-the-post"
        >
          <Button variant="link">Editar</Button>
          <NavDropdown.Divider />
          <Button variant="link" onClick={showDeleteConfirm}>
            Eliminar
          </Button>
        </NavDropdown>
      );
    } else {
      return "";
    }
  };

  return (
    <Row>
      <Col lg={4} className="text-center">
        <Avatar size={35} src={avatar ? avatar : NoAvatar} />
      </Col>
      <Col lg={17} className="pt-2 pl-2">
        <h6>
          <strong>{userData.username ? userData.username : "..."}</strong>
        </h6>
      </Col>
      <Col lg={3}>{validarUserLogin()}</Col>
    </Row>
  );
}

function DescripcionDelUserPost(props) {
  const { datos, avatar, userData } = props;

  return (
    <Row>
      <Col lg={4} className="text-center">
        <Avatar size={35} src={avatar ? avatar : NoAvatar} />
      </Col>
      <Col lg={20} className="pt-2 pl-2">
        <h6>
          <span>
            <strong>{userData.username ? userData.username : "..."}</strong>
          </span>{" "}
          {datos.description ? datos.description : "..."}
        </h6>
      </Col>
    </Row>
  );
}
