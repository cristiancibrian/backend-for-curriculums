const express = require('express')
const controllers = require('./controllers/controllers');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const sequelize = require('./db/sequelize');
const Informacion_Personal = require('./models/Informacion_Personal');
const Experiencia_Laboral = require('./models/Experiencia_Laboral');

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))

app.use(controllers);

sequelize.sync();

app.listen(process.env.PORT || 3000, () => {
    console.log('Server en el puerto', process.env.PORT || 3000)
})