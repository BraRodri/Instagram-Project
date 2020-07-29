import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Row, Col, Card } from "react-bootstrap";
import { FaHeart, FaComment } from "react-icons/fa";

import { getAllPostsOneUserApi, getImagePostApi } from "../../../../api/post";

import "./PostUser.css";

import ImageUserA from "../../../../assets/img/jpg/imagen-no-disponible.jpg";

export default function PostUser(props) {
  const { person } = props;
  const [datos, setDatos] = useState([]);
  const [reload, setReload] = useState(false);

  useEffect(() => {
    getAllPostsOneUserApi(person.id).then((response) => {
      setDatos(response.posts);
    });
    setReload(false);
  }, [person, reload]);

  return (
    <div>
      <Row className="row-card-post-profile">
        {datos ? (
          datos.map((item) => <RenderPost item={item} key={item._id} />)
        ) : (
          <h4 className="ml-4">No tienes Publicaciones Actualmente</h4>
        )}
      </Row>
    </div>
  );
}

function RenderPost(props) {
  const { item } = props;

  const [imagePost, setImagePost] = useState(null);

  useEffect(() => {
    if (item.image) {
      getImagePostApi(item.image).then((response) => {
        setImagePost(response);
      });
    } else {
      setImagePost(null);
    }
  }, [item]);

  return (
    <Col lg={4} md={4} xs={4} className="col-card-post-profile">
      <Link to={`/home/post/${item._id}`}>
        <Card className="card-post-profile">
          <Card.Img src={imagePost ? imagePost : ImageUserA} alt="image" />
          <div className="card-img-overlay d-flex flex-column justify-content-center">
            <p className="card-text oswald">
              <span className="mr-4">
                <FaHeart /> {item.likes}
              </span>
              <span>
                <FaComment /> 0
              </span>
            </p>
          </div>
        </Card>
      </Link>
    </Col>
  );
}
