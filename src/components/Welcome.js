import React, { Component } from "react";
import { Alert } from "react-bootstrap";
import ArticleListDDL from "./ArticleListDDL";
//import ContactUs from './email'

export default class Welcome extends Component {
  render() {
    return (
      <div>
        <ArticleListDDL />
        <br />
        {/* <ContactUs/> */}
      </div>
    );
  }
}
