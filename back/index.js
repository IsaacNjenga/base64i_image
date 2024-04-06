const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
//const bcryptjs = require("bcryptjs");
//const jwt = require("jsonwebtoken");
//const nodemailer = require("nodemailer");

const app = express();
app.use(express.json());
app.use(cors( {
    origin:["https://base64i-image-tvru.vercel.app"],
    methods:["POST","GET"],
    credentials: true
  }));

/*mongoose.connect(
  "mongodb+srv://IsaacNjenga:cations!@cluster0.xf14h71.mongodb.net/employee"
);*/

const mongoUrl = "mongodb+srv://IsaacNjenga:cations!@cluster0.xf14h71.mongodb.net/employee"

mongoose
  .connect(mongoUrl, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to database");
  })
  .catch(() => {
    console.log("error");
  });

//const imageModel = require("./models/imageDetails");
require('./models/imageDetails')
const Images = mongoose.model("ImageDetails");

app.post("/upload-image", async (req, res) => {
  const { base64 } = req.body;
  try {
    await Images.create({ image: base64 });
    res.send({ status: "ok" });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

app.get("/get-image", async (req, res) => {
  try {
    await Images.find({}).then((data) => {
      res.send({ status: "ok", data: data });
    });
  } catch (error) {
    res.status(500).send({ status: "error", message: error.message });
  }
});

app.listen(3001, () => {
  console.log("Connected");
});
