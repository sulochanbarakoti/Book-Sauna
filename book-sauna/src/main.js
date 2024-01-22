import React, { useEffect, useState } from "react";
import axios from "axios";
import Nav from "./nav";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import image from "./sauna.jpg";
import image1 from "./time.jpg";

const Main = () => {
  // RECEIVING DATA AND STORING IN VARIABLES
  const location = useLocation();
  const getData = location.state;
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [toEdit, setToEdit] = useState(false);
  const [saunaData, setSaunaData] = useState({});
  const [toEditdata, setToEditdata] = useState({});

  // FATCHING DATA USING GET REQUEST THROUGH API TO SERVER
  const [tableData, setTableData] = useState([]);
  useEffect(() => {
    const getBookings = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/bookings");
        setTableData(res.data);
      } catch (error) {
        console.error("error fatching bookings", error);
      }
    };
    getBookings();
  }, [refreshFlag]);

  //HANDLE THE CHANGES IN TIME INPUT
  const handleChange = (e) => {
    const { value } = e.target;
    const data = { ...getData };
    data.time = value;
    setSaunaData(data);
    console.log(saunaData);
  };

  const handleChangeUpdate = (e) => {
    const { value } = e.target;
    const data = { ...toEditdata };
    data.time = value;
    setToEditdata(data);
  };

  const handleClick = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/bookings",
        saunaData
      );
      setRefreshFlag(!refreshFlag);
    } catch (error) {
      console.error("error fatching bookings", error);
    }
  };

  const handleClickUpdate = async () => {
    if (toEditdata) {
      try {
        const res = await axios.patch(
          `http://localhost:5000/api/bookings/${toEditdata._id}`,
          toEditdata
        );
        // setTableData(res.data);
        setRefreshFlag(!refreshFlag);
        setToEdit(false);
      } catch (error) {
        console.error("error fatching bookings", error);
      }
    }
  };

  const handleClickCancel = () => {
    setToEdit(false);
  };

  //HANDLE DELETE BUTTON BY SENDING ID THROUGH PARAMS
  const handleDelete = async (id) => {
    const confirmation = window.confirm("Are you sure to delete this Booking?");
    try {
      if (confirmation) {
        const res = await axios.delete(
          `http://localhost:5000/api/bookings/${id}`
        );
        console.log(res);
        setRefreshFlag(!refreshFlag);
      }
    } catch (error) {
      console.error(error);
    }
  };

  //HANDLE EDIT BUTTON BY SENDING ID THROUGH PARAMS
  const handleEdit = (data) => {
    console.log(data._id);
    setToEditdata(data);
    setToEdit(true);
  };

  return (
    <div className="container align-items-center">
      <Nav props={getData.name}></Nav>
      <div className="row">
        {toEdit ? (
          <div className="col-sm-12 col-md-6">
            <div className="row p-3">
              <div className="card">
                <img src={image1} className="card-img-top" />
                <div className="card-body">
                  <p className="card-text">
                    Limit your sauna sessions to a reasonable duration,
                    typically 15-20 minutes. Prolonged exposure can lead to
                    dehydration and discomfort.<br></br>
                    <span className="h5">Update your new time to Sauna.</span>
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="container-fluid d-flex justify-content-center">
                <div className="row p-3 m-3 bg-info rounded-3">
                  <Form>
                    <Form.Group className="pb-3">
                      <Form.Label className="h5">
                        Set New Booking Time:
                      </Form.Label>
                      <Form.Control type="time" onChange={handleChangeUpdate} />
                    </Form.Group>
                    <Form.Group>
                      <Button
                        className="col-12 mb-2"
                        onClick={handleClickUpdate}
                      >
                        Update Time
                      </Button>
                      <Button
                        className="col-12 btn-danger"
                        onClick={handleClickCancel}
                      >
                        cancel
                      </Button>
                    </Form.Group>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="col-sm-12 col-md-6">
            <div className="row p-3">
              <div className="card">
                <img src={image} className="card-img-top" />
                <div className="card-body">
                  <p className="card-text">
                    Limit your sauna sessions to a reasonable duration,
                    typically 15-20 minutes. Prolonged exposure can lead to
                    dehydration and discomfort.<br></br>
                    <span className="h5">
                      Note: One time booking is for 1 hour only.
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="container-fluid d-flex justify-content-center">
                <div className="row p-3 m-3 bg-info rounded-3">
                  <Form>
                    <Form.Group className="pb-3">
                      <Form.Label className="h5">Book Your Time:</Form.Label>
                      <Form.Control type="time" onChange={handleChange} />
                    </Form.Group>
                    <Form.Group>
                      <Button className="col-12" onClick={handleClick}>
                        Book
                      </Button>
                    </Form.Group>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="col-sm-12 col-md-6">
          <div className="container-fluid d-flex justify-content-center">
            <div className="row p-3">
              <div className="col">
                {/* TABLE TO RENDER THE DATA */}
                <table className="table table-bordered">
                  <thead className="table-light">
                    <tr>
                      <th scope="col">S.N</th>
                      <th scope="col">Name</th>
                      <th scope="col">Room No.</th>
                      <th scope="col">Today's Bookings</th>
                    </tr>
                  </thead>
                  <tbody className="table-group-divider">
                    {tableData.map((data, index) => (
                      <tr key={index}>
                        <th scope="row">{index + 1}</th>
                        <td>{data.name}</td>
                        <td>{data.roomNumber}</td>
                        <td>
                          {data.time}
                          <button
                            className="btn btn-info btn-sm ms-5"
                            onClick={() => handleEdit(data)}
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm ms-2"
                            onClick={() => handleDelete(data._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
