"use strict";

const express = require("express");
const app = express();

const fs = require("fs").promises;
const multer = require("multer");

app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(multer().none());

const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
  console.log('Server listening on port: ' + PORT + "!");
});
