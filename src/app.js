const express = require('express')
const controllers = require('./controllers/controllers');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const sequelize = require('./db/sequelize');
const Curriculum = require('./models/curriculums');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(controllers);

sequelize.sync();

app.listen(process.env.PORT)