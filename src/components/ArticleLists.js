import React, { Component } from "react";
import { Card, Table, Button, ButtonGroup } from "react-bootstrap";

import { Link } from "react-router-dom";
import MyToast from "./myToast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash, faPlus } from "@fortawesome/free-solid-svg-icons";

import axiosInstance from "./axios";

export class ArticleLists extends Component {
  constructor(props) {
    super(props);
    this.state = {
      artikulli: [],
      id: "",
      cmimi: "",
      sasia: "",
      vlera: "",
    };
  }

  UpdateArtikulli(id) {
    console.log(id);
    this.props.history.push("/edit" + id);
  }

  componentDidMount() {
    this.getArtikujt();
  }

  async getArtikujt(e) {
    await axiosInstance
      .get("/artikulli")
      .then((response) => response.data)
      .then((data) => {
        this.setState({ artikulli: data });
      });
  }

  deleteArtikulli = (artikulliID) => {
    axiosInstance
      .delete("/artikulli/" + artikulliID)

      .then((res) => {
        if (res.data != null) {
          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);
          this.setState({
            artikulli: this.state.artikulli.filter(
              (artikull) => artikull.id !== artikulliID
            ),
          });
        } else {
          this.setState({ show: false });
        }
      });
  };
  addarticle = (props) => {
    return this.props.history.push(`/add`);
  };

  render() {
    return (
      <>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={"Artikulli u fshi me sukses."}
            type={"danger"}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            <Button
              variant="secondary"
              size="lg"
              block
              onClick={() => this.addarticle()}
            >
              {" "}
              <FontAwesomeIcon icon={faPlus} /> Add Article
            </Button>
          </Card.Header>
          <Card.Body>
            Number of article: {this.state.artikulli.length}
            <Table bordered hover striped variant="dark">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Value</th>
                  <th>Edit/Delete</th>
                </tr>
              </thead>

              <tbody>
                {this.state.artikulli.length === 0 ? (
                  <tr align="center">
                    <td colSpan="6"> No Article Available </td>
                  </tr>
                ) : (
                  this.state.artikulli.map((artikull) => (
                    <tr key={artikull.id}>
                      <td>{artikull.emri}</td>
                      <td>{artikull.cmimi}</td>
                      <td>{artikull.sasia}</td>
                      <td>{artikull.vlera}</td>
                      <ButtonGroup>
                        <Link
                          to={"edit/" + artikull.id}
                          onClick={() => this.UpdateArtikulli(artikull.id)}
                          className="btn btn-lg btn-outline-primary"
                        >
                          <FontAwesomeIcon icon={faEdit} />
                        </Link>{" "}
                        <Button
                          size="lg"
                          className="btn btn-lg btn-outline-danger"
                          onClick={this.deleteArtikulli.bind(this, artikull.id)}
                          style={{ marginLeft: "5px" }}
                        >
                          {" "}
                          <FontAwesomeIcon icon={faTrash} />{" "}
                        </Button>
                      </ButtonGroup>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </>
    );
  }
}
export default ArticleLists;
