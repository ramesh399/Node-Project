const express = require('express');
const bodyparser = require('body-parser');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
var port = 3000;
const sequelize = require('./database/database');
const User = require('./models/model');
//const mysql2 = require('mysql2');

//Middleware
app.use(morgan('dev'));

//CORS Policy
app.use(cors());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());




app.use('/api',require('./routes/index'));

app.listen(port, () => {
    console.log(`Server is runing on ${port}`);
})