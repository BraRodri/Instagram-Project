import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Image, Button } from "react-bootstrap";

//funciones importante
import { getAvatarApi } from "../../../api/user";

import "./SidebarRight.css";

import NoAvatar from "../../../assets/img/png/avatar.png";

export default function SidebarRight(props) {
  const { userData, reload } = props;

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (userData.avatar) {
      getAvatarApi(userData.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [reload, userData]);

  return (
    <div className="dejarfijo">
      <div>
        <div className="row historiaas">
          <div className="col-lg-3">
            <Image
              src={avatar ? avatar : NoAvatar}
              roundedCircle
              thumbnail
              fluid
            />
          </div>
          <div className="col-lg-9">
            <strong>{userData.username}</strong>
            <p>{userData.name}</p>
          </div>
        </div>
      </div>
      <div className="storisMos mt-3 ">
        <div className="row ">
          <div className="col-lg-8 mb-4">Sugerencias para ti</div>
          <div className="col-lg-4 text-right">
            <Link to="home/see-all">Ver Todo</Link>
          </div>
          <div className="overflow-auto elscroll col-lg-12 ">
            <div className="row historiaas">
              <div className="col-lg-2">
                <Image
                  src={NoAvatar}
                  roundedCircle
                  thumbnail
                  className="img-thumb-editado"
                />
              </div>
              <div className="col-lg-7">
                <strong>Username</strong>
                <p>Nuevo en Instagram</p>
              </div>
              <div className="col-lg-2 link-seguir">
                <Button variant="link">Seguir</Button>
              </div>
            </div>
          </div>

          <div className="overflow-auto elscroll col-lg-12 ">
            <div className="row historiaas">
              <div className="col-lg-2">
                <Image
                  src={NoAvatar}
                  roundedCircle
                  thumbnail
                  className="img-thumb-editado"
                />
              </div>
              <div className="col-lg-7">
                <strong>Username</strong>
                <p>Nuevo en Instagram</p>
              </div>
              <div className="col-lg-2 link-seguir">
                <Button variant="link">Seguir</Button>
              </div>
            </div>
          </div>

          <div className="overflow-auto elscroll col-lg-12 ">
            <div className="row historiaas">
              <div className="col-lg-2">
                <Image
                  src={NoAvatar}
                  roundedCircle
                  thumbnail
                  className="img-thumb-editado"
                />
              </div>
              <div className="col-lg-7">
                <strong>Username</strong>
                <p>Nuevo en Instagram</p>
              </div>
              <div className="col-lg-2 link-seguir">
                <Button variant="link">Seguir</Button>
              </div>
            </div>
          </div>

          <div className="overflow-auto elscroll col-lg-12 ">
            <div className="row historiaas">
              <div className="col-lg-2">
                <Image
                  src={NoAvatar}
                  roundedCircle
                  thumbnail
                  className="img-thumb-editado"
                />
              </div>
              <div className="col-lg-7">
                <strong>Username</strong>
                <p>Nuevo en Instagram</p>
              </div>
              <div className="col-lg-2 link-seguir">
                <Button variant="link">Seguir</Button>
              </div>
            </div>
          </div>

          <div className="overflow-auto elscroll col-lg-12 ">
            <div className="row historiaas">
              <div className="col-lg-2">
                <Image
                  src={NoAvatar}
                  roundedCircle
                  thumbnail
                  className="img-thumb-editado"
                />
              </div>
              <div className="col-lg-7">
                <strong>Username</strong>
                <p>Nuevo en Instagram</p>
              </div>
              <div className="col-lg-2 link-seguir">
                <Button variant="link">Seguir</Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-instagram">
        <footer>
          <p>
            About - Help - Press - API - Jobs - Privacy - Terms - Locations -
            Top Accounts - Hashtags - Language
          </p>
          <p>© 2020 INSTAGRAM FROM FACEBOOK</p>
        </footer>
      </div>
    </div>
  );
}
