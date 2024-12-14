const mongoose = require("mongoose");
const Trip = require("../models/travlr");
const Model = mongoose.model("trips");

const tripsList = async (req, res) => {
  const q = await Model.find({})
    .exec();

  if (!q) {
    return res.status(404).json(err);
  } else {
    return res.status(200).json(q);
  }
};

const tripsFindByCode = async (req, res) => {
  const q = await Model.find({ code: req.params.tripCode }).exec();

  if (!q) {
    return res.status(404).json(err);
  } else {
    return res.status(200).json(q);
  }
};

const tripsUpdateTrip = async (req, res) => {
  console.log(req.params);
  console.log(req.body);
  try {
    const q = await Model.findOneAndUpdate(
      { code: req.params.tripCode },
      {
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description,
      }
    ).exec();

    if (!q) {
      return res.status(404).json({ message: "Trip not found" });
    } else {
      return res.status(200).json(q);
    }

    // Uncomment the following line to show results of operation
    // console.log(q);
  } catch (error) {
    console.error("Error updating trip:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const tripsAddTrip = async (req, res) => {
  const newtrip = new Trip({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description,
  });

  const q = await newtrip.save();

  if (!q) {
    return res.status(400).json(err);
  } else {
    return res.status(201).json(q);
  }
};

module.exports = {
  tripsList,
  tripsFindByCode,
  tripsAddTrip,
  tripsUpdateTrip,
};