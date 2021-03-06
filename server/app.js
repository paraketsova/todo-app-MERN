require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_CONNECTION_URL);

const todoRouter = require('./routes/index');

const app = express();

app.use(cors());
app.use(logger('dev'));

const clientAppPath = path.join(__dirname, '../client', 'build');
app.use(express.static(clientAppPath));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/api', todoRouter);

module.exports = app;
