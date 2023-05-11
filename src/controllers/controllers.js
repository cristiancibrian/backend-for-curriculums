const { Router } = require('express');
const sequelize = require('../db/sequelize');
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const Curriculum = require('../models/curriculums');

cloudinary.config({
    cloud_name: "dd2khjwmx",
    api_key: "485347829911242",
    api_secret: "fIUtaMals1WZSl4BO0lHqpR8r1s"
});

const router = Router();



// Subir curriculum con foto
const storage = multer.diskStorage({
    destination: path.join(__dirname, '../temp'),
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    }
});

const upload = multer({ storage: storage });

router.get('/todos', async (req, res) => {
    const todos = await Curriculum.findAll();
    res.send(todos);
})

router.post('/crear', upload.single('imagen'), async (req, res) => {
    const {
        nombre, 
        apellido_paterno, 
        apellido_materno, 
        fecha_nacimiento, 
        telefono, 
        lugar_trabajo, 
        puesto, 
        sueldo, 
        descripcion_actividades
    } = req.body;

    if(!nombre || !apellido_paterno || !telefono) {
        return res.status(400).send({ error: 'Favor de llenar los campos obligatorios' });
    }

    let curriculumCrear = {
        nombre,
        apellido_paterno,
        apellido_materno: apellido_materno.length ? apellido_materno : null,
        fecha_nacimiento: fecha_nacimiento ? new Date(fecha_nacimiento) : null,
        telefono,
        lugar_trabajo: lugar_trabajo.length ? lugar_trabajo : null,
        puesto: puesto.length ? puesto : null,
        sueldo: sueldo.length ? sueldo : null,
        descripcion_actividades: descripcion_actividades.length ? descripcion_actividades : null,
    };

    try {
        if(req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            fs.unlinkSync(req.file.path);

            curriculumCrear.foto = result.secure_url;
        }

        const entity = await Curriculum.create(curriculumCrear);
        res.send(entity)
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al subir archivo' });
      }
})

module.exports = router;