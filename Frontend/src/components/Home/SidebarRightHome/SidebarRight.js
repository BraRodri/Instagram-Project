import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Avatar } from "antd";

//funciones importante
import { getAvatarApi } from "../../../api/user";

import "./SidebarRight.css";

import NoAvatar from "../../../assets/img/png/avatar.png";

export default function SidebarRight(props) {
  const { userData, homeReload } = props;

  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (userData.avatar) {
      getAvatarApi(userData.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [homeReload, userData]);

  return (
    <div className="dejarfijo">
      <div>
        <div className="row historiaas">
          <div className="col-lg-3">
            <Avatar size={55} src={avatar ? avatar : NoAvatar} />
          </div>
          <div className="col-lg-9 text-dejarfijo">
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
                <Avatar size={40} src={NoAvatar} />
              </div>
              <div className="col-lg-7 pt-1">
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
                <Avatar size={40} src={NoAvatar} />
              </div>
              <div className="col-lg-7 pt-1">
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
                <Avatar size={40} src={NoAvatar} />
              </div>
              <div className="col-lg-7 pt-1">
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
                <Avatar size={40} src={NoAvatar} />
              </div>
              <div className="col-lg-7 pt-1">
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
                <Avatar size={40} src={NoAvatar} />
              </div>
              <div className="col-lg-7 pt-1">
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
