import React from "react";
import { Card, Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlusSquare,
  faUndo,
  faList,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { withRouter, useHistory, useParams } from "react-router-dom";
import MyToast from "./myToast";
import { useState, useEffect } from "react";
import axiosInstance from "./axios";

const EditConsumer = (props) => {
  const [consumer, setConsumer] = useState({
    id: "",
    firstName: "",
    lastName: "",
    street: "",
    city: "",
    postalCode: "",
    contact: "",
  });

  //const Url="https://localhost:44362/api/bleresi/"+props.match.params.id;
  let history = useHistory();
  const { id } = useParams();

  const UpdateConsumer = (e) => {
    e.preventDefault();

    const data = {
      id: consumer.id,
      firstName: consumer.firstName,
      lastName: consumer.lastName,
      street: consumer.street,
      city: consumer.city,
      postalCode: consumer.postalCode,
      contact: consumer.contact,
    };
    axiosInstance.put(`/bleresi/${id}`, data).then((result) => {
      props.history.push("/lista/bleresi");
      console.log(result);
    });
  };

  useEffect(() => {
    loadConsumer();
  }, []);

  const onChange = (e) => {
    e.persist();
    setConsumer({ ...consumer, [e.target.name]: e.target.value });
  };

  function handleClick() {
    history.push("/lista/bleresi");
  }

  const loadConsumer = async () => {
    debugger;
    const result = await axiosInstance.get(`/bleresi/${id}`);
    console.log(result);
    setConsumer(result.data);
  };

  return (
    <div>
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header>
          {" "}
          <FontAwesomeIcon
            style={{ marginLeft: "10px" }}
            icon={faEdit}
            size="lg"
          />{" "}
          Edit Consumer
        </Card.Header>
        <Form onSubmit={UpdateConsumer} id="artikulliFormId">
          <Card.Body>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridArtikulli">
                <Form.Label>FirstName</Form.Label>
                <Form.Control
                  value={consumer.firstName}
                  onChange={onChange}
                  autoComplete="off"
                  required
                  name="firstName"
                  className="bg-dark text-white"
                  type="text"
                  placeholder="FirstName"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridCmimi">
                <Form.Label>LastName</Form.Label>
                <Form.Control
                  value={consumer.lastName}
                  onChange={onChange}
                  autoComplete="off"
                  required
                  name="lastName"
                  className="bg-dark text-white"
                  type="text"
                  placeholder="LastName"
                />
              </Form.Group>
            </Form.Row>

            <Form.Row>
              <Form.Group as={Col} controlId="formGridSasia">
                <Form.Label>Street</Form.Label>
                <Form.Control
                  value={consumer.street}
                  onChange={onChange}
                  required
                  name="street"
                  className="bg-dark text-white"
                  type="text"
                  placeholder="Street"
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  value={consumer.city}
                  onChange={onChange}
                  required
                  name="city"
                  className="bg-dark text-white"
                  type="text"
                  placeholder="City"
                />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col} controlId="formGridPrice">
                <Form.Label>PostalCode</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  value={consumer.postalCode}
                  onChange={onChange}
                  type="text"
                  name="postalCode"
                  className={"bg-dark text-white"}
                  placeholder="PostalCode"
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPrice">
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  required
                  autoComplete="off"
                  value={consumer.contact}
                  onChange={onChange}
                  type="text"
                  name="contact"
                  className={"bg-dark text-white"}
                  placeholder="Contact"
                />
              </Form.Group>
            </Form.Row>
          </Card.Body>
          <Card.Footer style={{ textAlign: "center" }}>
            <Button size="sm" className="btn btn-dark btn-block" type="submit">
              <FontAwesomeIcon icon={faSave} />
              {""} Update{" "}
            </Button>{" "}
            {""}
            {""}
            {""}
            <Button
              onClick={() => setConsumer("")}
              className="btn btn-dark btn-block"
              type="reset"
            >
              <FontAwesomeIcon icon={faUndo} /> Reset
            </Button>
            {"  "}
            <Button
              onClick={handleClick}
              size="sm"
              className="btn btn-dark btn-block"
              type="button"
            >
              <FontAwesomeIcon icon={faList} /> List
            </Button>
          </Card.Footer>
        </Form>
      </Card>
    </div>
  );
};

export default withRouter(EditConsumer);
