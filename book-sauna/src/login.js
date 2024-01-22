import React, { useState, useEffect } from "react";
import { Button, Dropdown, DropdownButton, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    roomNumber: "",
    date: "",
    time: "",
  });

  useEffect(() => {
    const currentDate = new Date();

    // Get the individual components of the date
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth() + 1; // Month is zero-based, so add 1
    const day = currentDate.getDate();

    // Format the date as a string (e.g., "YYYY-MM-DD")
    const formattedDate = `${year}-${month < 10 ? "0" : ""}${month}-${
      day < 10 ? "0" : ""
    }${day}`;
    const data = { ...formData };
    data.date = formattedDate;
    setFormData(data);
  }, []);

  // handle the changes in form input
  const handleChange = (e) => {
    const { value } = e.target;
    const data = { ...formData };
    data.name = value;
    setFormData(data);
  };

  // handle the changes in dropdown
  const handleDropdown = (value) => {
    const data = { ...formData };
    data.roomNumber = value;
    setFormData(data);
  };

  // handle send form data
  const handleSubmit = () => {
    navigate(`/home`, { state: formData });
  };
  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="row rounded-2" style={{ backgroundColor: "#a6e3f7" }}>
        <div className="col p-3">
          <div className="col h4 p-2 d-flex justify-content-center">
            Sauna Time
          </div>
          <Form>
            <Form.Group className="pb-3">
              <Form.Label className="h7 fw-semibold">Username: </Form.Label>
              <Form.Control
                type="text"
                name="name"
                onChange={handleChange}
                placeholder="Your username here...."
              />
            </Form.Group>
            <Form.Group className="pb-3">
              <Form.Label className="h7 fw-semibold">Room No: </Form.Label>
              <DropdownButton
                id="dropdown-basic-button"
                title={formData.roomNumber || "Select room Number"}
              >
                <Dropdown.Item onClick={() => handleDropdown("A15")}>
                  A 15
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdown("A16")}>
                  A 16
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdown("A17")}>
                  A 17
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdown("A18")}>
                  A 18
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdown("A19")}>
                  A 19
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdown("B15")}>
                  B 15
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdown("B16")}>
                  B 16
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdown("B17")}>
                  B 17
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleDropdown("B18")}>
                  B 18
                </Dropdown.Item>
              </DropdownButton>
            </Form.Group>
            <Form.Group>
              <Button
                className="col-12"
                style={{ backgroundColor: "forestgreen", borderColor: "white" }}
                onClick={handleSubmit}
              >
                Submit
              </Button>
            </Form.Group>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
