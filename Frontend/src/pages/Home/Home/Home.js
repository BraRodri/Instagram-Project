import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";

import { getUserIdApi } from "../../../api/user";

import Post from "../../../components/Home/PostHome";
import SidebarRight from "../../../components/Home/SidebarRightHome";

export default function Home(props) {
  const { person } = props;

  const [userData, setUserData] = useState({});
  const [homeReload, setHomeReload] = useState(false);

  useEffect(() => {
    const idPerson = person.id;
    getUserIdApi(idPerson).then((response) => {
      setUserData(response.user);
    });
    setHomeReload(false);
  }, [homeReload]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div>
      <Row className="mt-5 mb-5">
        <Col lg={8} md={12}>
          <Post userData={userData} />
        </Col>
        <Col lg={4} md={12}>
          <SidebarRight
            userData={userData}
            homeReload={homeReload}
            setHomeReload={setHomeReload}
          />
        </Col>
      </Row>
    </div>
  );
}
