'use strict';

require('dotenv').config();



const express = require('express');
const app = express();
const books=require('./routes/index');
app.use(express.json());

const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
const PORT = 3001;



mongoose
  .connect("mongodb+srv://hamzah:Aldaamas654321@cluster0.ngrbh6n.mongodb.net/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((con) => {
    console.log("DB connection successful");
  });

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads'));
app.use('/',(req,res)=>{
  return res.status(200).json({
    message:"Success"
  })
})
app.use(books)
app.listen(PORT, () => console.log(`listening on ${PORT}`));
