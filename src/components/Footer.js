import React from "react";
import { Navbar, Col, Container } from "react-bootstrap";

const Footer = () => {
  return (
    <Navbar fixed="bottom" bg="dark" variant="dark" className="text-white">
      <Container>
        <Col lg={12} className="text-center text-mutted">
          <div>All rights deserved by ED</div>
        </Col>
      </Container>
    </Navbar>
  );
};
export default Footer;
