const express = require('express');
const bodyParser =require('body-parser');
const donenv = require('dotenv');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());


const connectDB = require('./config/db');
//Load config
donenv.config({path: './config/config.env'})

connectDB();

//routes
app.use(cors());
app.use('/', require('./routes/index'));

app.listen(3000);