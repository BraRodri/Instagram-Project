import React, { useState, useEffect } from "react";
import { Button } from "react-bootstrap";
import { FiHeart } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";

import {
  getLikeStateApi,
  addLikeApi,
  deleteLikeApi,
} from "../../../../api/like";
import { updatePostLikeApi } from "../../../../api/post";

export default function UpdateLike(props) {
  const { idPost, person, setReload } = props;
  const [reloadLike, setReloadLike] = useState(false);
  const [estado, setEstado] = useState();
  const [datosLike, setDatosLike] = useState({});

  useEffect(() => {
    getLikeStateApi(idPost)
      .then((response) => {
        setEstado(response.state);
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
    setReloadLike(false);
  }, [reloadLike]); // eslint-disable-line react-hooks/exhaustive-deps

  const darLike = () => {
    const newDatos = {
      idPost: idPost,
      idUser: person.id,
      state: true,
    };

    const stateNew = {
      state: true,
    };

    addLikeApi(newDatos)
      .then((response) => {
        setDatosLike(response.like);
        updatePostLikeApi(stateNew, idPost).then((response) => {
          console.log(response);
        });
        setReloadLike(true);
        setReload(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  console.log(datosLike);

  const quitarLike = () => {
    const stateNew = {
      state: false,
    };

    const id = datosLike._id;

    updatePostLikeApi(stateNew, idPost).then((response) => {
      console.log(response);
      deleteLikeApi(id).then((response) => {
        console.log(response);
        setEstado(false);
        setReloadLike(true);
        setReload(true);
      });
    });
  };

  return (
    <>
      {estado ? (
        <Button variant="light" className="pl-3" onClick={quitarLike}>
          <FaHeart className="icon-comen" />
        </Button>
      ) : (
        <Button variant="light" className="pl-3" onClick={darLike}>
          <FiHeart className="icon-comen" />
        </Button>
      )}
    </>
  );
}
