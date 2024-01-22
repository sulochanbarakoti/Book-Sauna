const express = require("express");
const cors = require("cors");
const Booking = require("./module");
const connect = require("./db");
require("dotenv").config();

const app = express();

//middleware
app.use(express.json());
app.use(cors());

//POST REQUIST API
app.post("/api/bookings", async (req, res) => {
  const { name, time, date, roomNumber } = req.body;
  if (!time) {
    res.send("error");
  }
  let booking = await Booking.create(req.body);
  res.status(201).json({ booking });
});

//GET REQUEST API
app.get("/api/bookings", async (req, res) => {
  try {
    let bookings = await Booking.find();
    res.status(201).json(bookings);
  } catch (error) {
    res.send(error);
  }
});

//GET UPDATE REQUEST BY ID
app.patch("/api/bookings/:id", async (req, res) => {
  try {
    const { id: bookingId } = req.params;
    let booking = await Booking.findByIdAndUpdate(
      { _id: bookingId },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    res.json({ booking });
  } catch (error) {
    res.json({ success: false, data: error });
  }
});

//GET DELETE REQUEST BY ID
app.delete("/api/bookings/:id", async (req, res) => {
  try {
    const { id: bookingId } = req.params;
    let booking = await Booking.findByIdAndDelete({ _id: bookingId });
    if (!booking) {
      return res
        .status(404)
        .json({ sucess: true, data: "no data with that id" });
    }
    res.json({ booking });
  } catch (error) {
    res.json({ success: false, data: error });
  }
});

const Start = async () => {
  try {
    await connect(process.env.MANGO_URL);
    app.listen(5000, () => {
      console.log("server serve at port 5000");
    });
  } catch (error) {
    console.error(error);
  }
};

Start();
