import emailjs from "emailjs-com";
import React from "react";
import { animateVisualElement, motion } from "framer-motion";
import { Alert } from "react-bootstrap";
export default function ContactUs() {
  function sendEmail(e) {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_oqfuzq8",
        "template_p5m8plm",
        e.target,
        "user_3F5n8kzhpxUrfkDS3Ki01"
      )
      .then(
        (result) => {
          alert("Email sent successfully");
          console.log(result.text);
        },
        (error) => {
          alert("Something gone wrong");
          console.log(error.text);
        }
      );
    e.target.reset();
  }

  return (
    <div>
      <motion.div
        initial={{ x: "-100vh" }}
        transition={{ type: "spring", stiffness: 120 }}
        animate={{ x: 0 }}
      >
        <Alert variant="success">
          <Alert.Heading>Hey, nice to see you</Alert.Heading>

          <hr />
          <p className="mb-0">YOU CAN SEND US EMAIL!</p>
        </Alert>
        <form onSubmit={sendEmail}>
          <div className="row pt-5 mx-auto">
            <div className="col-8 form-group mx-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Name"
                name="name"
              />
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              <input
                type="email"
                className="form-control"
                placeholder="Email Address"
                name="email"
              />
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              <input
                type="text"
                className="form-control"
                placeholder="Subject"
                name="subject"
              />
            </div>
            <div className="col-8 form-group pt-2 mx-auto">
              <textarea
                className="form-control"
                id=""
                cols="30"
                rows="8"
                placeholder="Your message"
                name="message"
              ></textarea>
            </div>
            <div className="col-8 pt-3 mx-auto">
              <input
                type="submit"
                className="btn btn-info"
                value="Send Email"
              ></input>
            </div>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
