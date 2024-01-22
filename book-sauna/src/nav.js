import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import { useNavigate } from "react-router-dom";

const NavBar = (props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/`);
  };
  return (
    <Navbar style={{ backgroundColor: "#4d90fe" }}>
      <Container>
        <Navbar.Brand className="h5" style={{ color: "white" }}>
          Welcome to Sauna....
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text style={{ color: "white" }}>
            <Button className="btn-sm btn-danger me-3" onClick={handleClick}>
              Home
            </Button>
            Signed in as: <span className="fw-semibold">{props.props}</span>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
