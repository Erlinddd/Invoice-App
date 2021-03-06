import React, { Component } from "react";
import { Card, Form, Button, Col, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSave,
  faPlusSquare,
  faUndo,
  faList,
  faEdit,
} from "@fortawesome/free-solid-svg-icons";
import { withRouter } from "react-router-dom";
import MyToast from "./myToast";
import axiosInstance from "./axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const labelCss = {
  fontSize: "21px",
  marginBottom: "70px",
  marginLeft: "450px",
  //padding: "9px",
  display: "inline-block",
};

class AddArticle extends Component {
  constructor(props) {
    super(props);

    this.state = this.initialState;
    this.state.show = false;
    this.artikulliChange = this.artikulliChange.bind(this);
    this.submitArtikulli = this.submitArtikulli.bind(this);
    this.artikulliList = this.artikulliList.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
    this._changeNum1 = this._changeNum1.bind(this);
    this._changeNum2 = this._changeNum2.bind(this);
  }
  initialState = {
    id: 0,
    emri: "",
    cmimi: "",
    njesia: "",
    sasia: "",
    vlera: "",
  };

  componentDidMount() {
    const { id } = this.props.match.params;
    if (id) {
      this.artikulliById(id);
    }
  }

  artikulliById = (id) => {
    if (this.props.match && this.props.match.params.id) {
      axiosInstance
        .get("/artikulli/" + id)
        .then((response) => {
          if (response.data != null) {
            this.setState(response.data);
          }
        })
        .catch((error) => {
          console.error("error:" + error);
        });
    }
  };

  submitArtikulli(event) {
    event.preventDefault();
    axiosInstance
      .post("/artikulli", this.state)
      .then((response) => {
        if (response.data != null) {
          console.log(response.data);

          this.setState({ show: true });
          setTimeout(() => this.setState({ show: false }), 3000);
          setTimeout(() => this.artikulliList(), 2000);
        } else {
          this.setState({ show: false });
        }
      })
      .catch((error) => {
        toast.warn(" Something went wrong,please try again later!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  }

  async updateArticle(event) {
    event.preventDefault();
    await axiosInstance
      .put(`/artikulli/${this.state.id}`, this.state)
      .then((response) => {
        if (response.data != null) {
          console.log(response.data);

          this.setState({ show: true });

          setTimeout(() => this.setState({ show: false }), 3000);
          setTimeout(() => this.artikulliList(), 2000);
        } else {
          this.setState({ show: false });
        }
      })
      .catch((error) => {
        toast.warning("error:" + error);
      });
  }

  resetArtikulli = () => {
    this.setState(() => this.initialState);
  };

  getTotal() {
    var total = this.state.cmimi * this.state.sasia;
    return total;
  }

  artikulliChange = (event) => {
    if (event.target.name === "emri") {
      this.setState({ [event.target.name]: event.target.value });
    } else {
      this.setState({ [event.target.name]: parseInt(event.target.value) });
    }
  };

  njesiaChange = (e) => {
    this.setState({ njesia: e.target.value });
  };
  _changeNum1(e) {
    if (e.target.validity.valid) {
      var newNum1 = +e.target.value;
      this.setState({
        cmimi: newNum1,
        vlera: newNum1 * this.state.sasia,
      });
    }
  }
  _changeNum2(e) {
    if (e.target.validity.valid) {
      var newNum2 = +e.target.value;
      this.setState({
        sasia: newNum2,
        vlera: this.state.cmimi * newNum2,
      });
    }
  }

  artikulliList = (props) => {
    return this.props.history.push(`/lists`);
  };

  render() {
    return (
      <>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={
              this.state.id
                ? "Artikulli ndryshoj me sukses"
                : "Artikulli u shtua me sukses"
            }
            type={"success"}
          />
        </div>
        <Card className={"border border-dark bg-dark text-white"}>
          <Card.Header>
            {" "}
            <FontAwesomeIcon
              icon={this.state.id ? faEdit : faPlusSquare}
            />{" "}
            {this.state.id ? "Ndrysho artikuj" : "Shto Artikuj"}{" "}
          </Card.Header>
          <Form
            onReset={this.resetArtikulli}
            onSubmit={this.state.id ? this.updateArticle : this.submitArtikulli}
            id="artikulliFormId"
          >
            <Card.Body>
              <Form.Row>
                <Form.Group as={Col} controlId="formGridArtikulli">
                  <Form.Label>Artikulli</Form.Label>
                  <Form.Control
                    className="over"
                    autoComplete="off"
                    value={this.state.emri}
                    onChange={this.artikulliChange}
                    required
                    name="emri"
                    className="bg-dark text-white"
                    type="text"
                    placeholder="Article name"
                  />
                </Form.Group>

                <div className=" bg-dark">
                  <label className="mr-sm-8" for="inlineFormCustomSelect">
                    Njesia
                  </label>
                  <select
                    className=" bg-dark text-white  custom-select mr-sm-8"
                    id="inlineFormCustomSelect"
                    value={this.state.njesia}
                    onChange={this.njesiaChange}
                  >
                    <option value="Unit">Unit</option>
                    <option value="Kg">Kg</option>
                    <option value="Liter">Liter</option>
                  </select>
                </div>

                <Form.Group as={Col} controlId="formGridCmimi">
                  <Form.Label>Cmimi</Form.Label>
                  <Form.Control
                    required
                    className="bg-dark text-white"
                    name="cmimi"
                    type="number"
                    placeholder="Price"
                    value={this.state.cmimi}
                    onChange={this._changeNum1}
                  />
                </Form.Group>
              </Form.Row>
              <Form.Row className="mb-12">
                <Form.Group as={Col} mb="12" controlId="formGridSasia">
                  <Form.Label>Sasia</Form.Label>
                  <Form.Control
                    value={this.state.sasia}
                    onChange={this._changeNum2}
                    required
                    name="sasia"
                    className="bg-dark text-white"
                    type="Number"
                    placeholder="Quantity"
                  />

                  <br />
                </Form.Group>
              </Form.Row>
              <Form.Group as={Col} controlId="formGridVlera">
                <br />
                <Form.Label style={labelCss} value={this.vlera}>
                  Vlera Totale{" "}
                  <InputGroup.Text id="inputGroupPrepend">
                    {this.state.vlera}
                  </InputGroup.Text>{" "}
                </Form.Label>
              </Form.Group>
            </Card.Body>

            <Card.Footer style={{ textAlign: "center" }}>
              <Button size="sm" variant="success" type="submit">
                <FontAwesomeIcon icon={faSave} />
                {""} {this.state.id ? "Update" : "Submit"}{" "}
              </Button>{" "}
              {""}
              <Button size="sm" variant="info" type="reset">
                <FontAwesomeIcon icon={faUndo} /> Reset
              </Button>
              {"  "}
              {""}
              <Button
                onClick={this.artikulliList.bind()}
                size="sm"
                variant="info"
                type="button"
              >
                <FontAwesomeIcon icon={faList} /> List
              </Button>
              <ToastContainer
                position="top-right"
                autoClose={4000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
              />
              {/* Same as */}
              <ToastContainer />
            </Card.Footer>
          </Form>
        </Card>
      </>
    );
  }
}

export default withRouter(AddArticle);
