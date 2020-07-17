import React from "react";
import { Row, Col } from "react-bootstrap";

import Post from "../../../components/Home/PostHome";
import SidebarRight from "../../../components/Home/SidebarRightHome";

export default function Home() {
  return (
    <div>
      <Row className="mt-5 mb-5">
        <Col lg={8} md={12}>
          <Post />
        </Col>
        <Col lg={4} md={12}>
          <SidebarRight />
        </Col>
      </Row>
    </div>
  );
}
