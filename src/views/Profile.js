import React, { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";

import Highlight from "../components/Highlight";
import Loading from "../components/Loading";
import { useRownd } from "@rownd/react";

export const ProfileComponent = () => {
  const { user, is_initializing, is_authenticated, requestSignIn } = useRownd();

  useEffect(() => {
    if (!is_initializing && !is_authenticated) {
      requestSignIn({
        prevent_closing: true,
      });
    }
  }, [is_initializing, is_authenticated, requestSignIn]);

  if (is_initializing) {
    return <Loading />;
  }

  return (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src={user.data.picture}
            alt="Profile"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <h2>{user.data.name}</h2>
          <p className="lead text-muted">{user.data.email}</p>
        </Col>
      </Row>
      <Row>
        <Highlight>{JSON.stringify(user, null, 2)}</Highlight>
      </Row>
    </Container>
  );
};

export default ProfileComponent;
