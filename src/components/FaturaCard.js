import React, { useState, useEffect, useContext } from "react";
import { Card, Form, Table, Button, ButtonGroup } from "react-bootstrap";
import axios from "axios";
import moment from "moment";
import FileUploadIcon from "@mui/icons-material/FileUpload";

const FaturaCard = (props) => {
  const [image, setImage] = useState(null);

  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const [fat, setFat] = useState({
    id: 0,
    data: "",
    idBleresi: 0,
    faturaArtikullis: [],
    bleresi: "",
  });
  useEffect(() => {
    var faturaEselektuar = JSON.parse(localStorage.getItem("FaturaEselektuar"));
    console.log(fat);
    setFat(faturaEselektuar);
    // alert(faturaEselektuar.id)
  }, []);

  function printFatura() {
    window.print();
  }
  return (
    <div>
      <Card text="dark" className="text-center">
        {/* <div>
    <input type="file" onChange={onImageChange} className="filetype" />
    <img src={image} alt="preview image" />
  </div> */}

        <Card.Header>
          Fatura u krijua nga:
          <Form.Label style={{ marginLeft: "2px" }}>
            {localStorage.getItem("user")}{" "}
          </Form.Label>{" "}
        </Card.Header>
        <Card.Header>
          FaturaId:<Form.Label>{fat.id} </Form.Label>{" "}
        </Card.Header>

        <Card.Header>
          Bleresi:<Form.Label>{fat.bleresi.firstName} </Form.Label>{" "}
        </Card.Header>
        <Card.Header>
          Data:
          <Form.Label>
            {moment(fat.data).format("YYYY-MM-DD hh:mm")}{" "}
          </Form.Label>
        </Card.Header>

        <Card.Body>
          <Card.Title></Card.Title>
          <Card.Text>
            <p id="demo"></p>
          </Card.Text>
          <Table bordered hover striped variant="white">
            <thead>
              <tr>
                <th>Artikulli</th>
                <th>Sasia</th>
                <th>Cmimi</th>
                <th>Vlera</th>
              </tr>
            </thead>

            <tbody>
              {fat.faturaArtikullis.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.artikulli}</td>
                    <td>{item.sasia}</td>
                    <td>{item.cmimi}</td>
                    <td>{item.vlera}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Card.Body>
        <ButtonGroup>
          <Button onClick={printFatura}>Print the Invoice</Button>
          <Button variant="secondary" href="mailto:someone@example.com">
            Sent with Email{" "}
          </Button>
        </ButtonGroup>
      </Card>
      <div class="button-wrapper">
        <span class="label">
          <FileUploadIcon /> Upload Logo of Company
        </span>

        <input
          type="file"
          onChange={onImageChange}
          name="upload"
          id="upload"
          className="upload-box"
          placeholder="Upload File"
        />
        <img src={image} />
      </div>
    </div>
  );
};

export default FaturaCard;
