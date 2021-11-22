import React from "react";
import {
  Card,
  Table,
  Button,
  ButtonGroup,
  ReactBootStrapSpinner,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import MyToast from "./myToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { withRouter, useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as ReactBootStrap from "react-bootstrap";

import axiosInstance from "./axios";
import CreateUserPopUp from "./openDialog/CreateUserPopUp";

toast.configure();

const UserList = (props) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Street: "",
    City: "",
    PostalCode: "",
    Contact: "",
    RajoniId: "",
  });

  useEffect(() => {
    const GetData = async () => {
      const result = await axiosInstance.get("/bleresi");
      debugger;
      setData(result.data);
      console.log(result.data);
    };
    GetData();

    setLoading(true);
  }, []);

  const onChange = (e) => {
    const { value, id } = e.target;
    console.log(value, id);
    setFormData({ ...formData, [id]: value });
  };

  const deleteConsumer = (id) => {
    axiosInstance.delete("/bleresi/" + id).then((result) => {
      const confirm = window.confirm("Are your sure to delete the client");
      console.log(confirm);
      props.history.push("/Welcome");
    });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleFormSubmit = () => {
    const data = {
      FirstName: formData.FirstName,
      LastName: formData.LastName,
      Street: formData.Street,
      City: formData.City,
      PostalCode: formData.PostalCode,
      Contact: formData.Contact,
      RajoniId: formData.RajoniId,
    };
    axiosInstance.post("/bleresi", data).then((result) => {
      console.log("Res", result);
      props.history.push("/Welcome");
      handleClose();
    });
  };

  const rajoniOnChange = (e) => {
    debugger;
    setFormData({ ...formData, RajoniId: e.target.value });
  };

  return (
    <div style={{ position: "absolut" }} className="container">
      <Card className={"border border-dark bg-dark text-white"}>
        <Card.Header>
          <Button
            variant="secondary"
            size="lg"
            block
            onClick={handleClickOpen}
            handleFormSubmit={handleFormSubmit}
          >
            {" "}
            <FontAwesomeIcon icon={faPlus} /> Add Consumer
          </Button>
        </Card.Header>
        <Card.Body>
          <h6>Number of consumer:{data.length} </h6>
          <Table
            responsive
            style={{ position: "absolut" }}
            bordered
            hover
            striped
            variant="dark"
          >
            <thead style={{ position: "absolut" }}>
              <tr>
                <th>Firstname</th>
                <th>Lastname</th>
                <th>Street</th>
                <th>City</th>
                <th>PostalCode</th>
                <th>Contact</th>
                <th>Edit/Delete </th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.street}</td>
                      <td>{item.city}</td>
                      <td>{item.postalCode}</td>
                      <td>{item.contact}</td>
                      <td>
                        <ButtonGroup>
                          <Link
                            className="btn btn-lg btn-outline-primary"
                            to={`/editt/bleresi/${item.id}`}
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </Link>{" "}
                          <Button
                            size="lg"
                            onClick={() => {
                              deleteConsumer(item.id);
                            }}
                            className="btn btn-lg btn-outline"
                            style={{ marginLeft: "5px" }}
                          >
                            {" "}
                            <FontAwesomeIcon icon={faTrash} />
                          </Button>
                        </ButtonGroup>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <Spinner animation="border" />
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
      <CreateUserPopUp
        rajoniOnChange={rajoniOnChange}
        data={formData}
        onChange={onChange}
        open={open}
        handleFormSubmit={handleFormSubmit}
        handleClose={handleClose}
        handleClickOpen={handleClickOpen}
      />
    </div>
  );
};

export default withRouter(UserList);
