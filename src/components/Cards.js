import { Card } from "react-bootstrap";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faList, faSignOut } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import AssessmentIcon from "@mui/icons-material/Assessment";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { makeStyles } from "@material-ui/core/styles";

// const useStyles = makeStyles(theme => ({
//   customHoverFocus: {
//     "&:hover, &.Mui-focusVisible": { backgroundColor: "#f1f1f1" }
//   }
// }));

export function Cards() {
  // const classes = useStyles();
  return (
    <motion.div
      initial={{ y: -250 }}
      animate={{ y: -7 }}
      transition={{ type: "spring", stiffness: 100 }}
    >
      <div className="cards-position">
        <Card
          bg="success"
          text="white"
          style={{ width: "28rem" }}
          className="mb-2"
        >
          <Card.Header> Consumer</Card.Header>
          <Card.Body>
            <Card.Title>Create Consumer </Card.Title>
            <Card.Text>
              <Link to="/lista/bleresi" className="nav-link">
                <h2 style={{ color: "white", textAlign: "center" }}>
                  {" "}
                  <AddCircleIcon color="white" sx={{ fontSize: 40 }} />{" "}
                </h2>
              </Link>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card
          bg="warning"
          text="white"
          style={{ width: "28rem" }}
          className="mb-2"
        >
          <Card.Header> Article</Card.Header>
          <Card.Body>
            <Card.Title>Create Article </Card.Title>
            <Card.Text>
              <Link to="/lists" className="nav-link">
                <h2 style={{ color: "white", textAlign: "center" }}>
                  {" "}
                  <AddShoppingCartIcon
                    color="white"
                    sx={{ fontSize: 40 }}
                  />{" "}
                </h2>
              </Link>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card
          bg="danger"
          text="white"
          style={{ width: "28rem" }}
          className="mb-2"
        >
          <Card.Header>Invoice</Card.Header>
          <Card.Body>
            <Card.Title>Create Invoice </Card.Title>
            <Card.Text>
              <Link to="/Welcome" className="nav-link">
                <h2 style={{ color: "white", textAlign: "center" }}>
                  {" "}
                  <ReceiptIcon color="white" sx={{ fontSize: 40 }} />{" "}
                </h2>
              </Link>
            </Card.Text>
          </Card.Body>
        </Card>

        <Card
          bg="primary"
          text="white"
          style={{ width: "28rem" }}
          className="mb-2"
        >
          <Card.Header>Dashboard</Card.Header>
          <Card.Body>
            <Card.Title>See the reports </Card.Title>
            <Card.Text>
              <Link to="/faturat" className="nav-link">
                <h2 style={{ color: "white", textAlign: "center" }}>
                  {" "}
                  <AssessmentIcon color="white" sx={{ fontSize: 40 }} />{" "}
                </h2>
              </Link>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </motion.div>
  );
}

export default withRouter(Cards);
