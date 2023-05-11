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

app.use( express.static(path.join(__dirname, 'public/images')));

sequelize.sync();

app.listen(3000, () => {
    console.log('Server listening on port 3000')    
})