const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  time: { type: String, required: true },
  date: { type: String, required: true },
  name: { type: String, required: true },
  roomNumber: { type: String, required: true },
});

module.exports = mongoose.model("Booking", BookingSchema);
