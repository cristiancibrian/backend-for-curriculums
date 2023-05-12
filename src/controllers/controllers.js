const { Router } = require('express');
const sequelize = require('../db/sequelize');
const multer = require('multer');
const path = require('path');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const Informacion_Personal = require('../models/Informacion_Personal');
const Experiencia_Laboral = require('../models/Experiencia_Laboral');

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

router.get('/obtener/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const informacion = await Informacion_Personal.findByPk(id, {
            include: [{ model: Experiencia_Laboral }]
        })

        if(!informacion) {
            return res.status(400).send({ error: 'No se encontró' })
        }

        res.send(informacion);
    } catch (error) {
        
    }
});

router.get('/todos', async (req, res) => {
    const todos = await Informacion_Personal.findAll({
        include: [{ model: Experiencia_Laboral }]
    });
    res.send(todos);
})

router.post('/crear', upload.single('imagen'), async (req, res) => {
    const {
        nombre, 
        apellido_paterno, 
        apellido_materno, 
        fecha_nacimiento, 
        telefono, 
        experiencias_laborales 
    } = req.body;
    let experiencias = [];

    if(!nombre || !apellido_paterno || !telefono) {
        return res.status(400).send({ error: 'Favor de llenar los campos obligatorios' });
    }
    
    if(experiencias_laborales.length > 2) {
        experiencias = JSON.parse(experiencias_laborales);
    }

    let informacion_personal = {
        nombre,
        apellido_paterno,
        apellido_materno: apellido_materno.length ? apellido_materno : null,
        fecha_nacimiento: fecha_nacimiento ? new Date(fecha_nacimiento) : null,
        telefono
    };

    try {
        if(req.file) {
            const result = await cloudinary.uploader.upload(req.file.path);
            fs.unlinkSync(req.file.path);

            informacion_personal.foto = result.secure_url;
        }

        const infoCreada = await Informacion_Personal.create(informacion_personal);
    
        if(experiencias.length > 0) {
            experiencias.forEach(e => {
                e.informacion_personal_id = infoCreada.id
            });
    
            await Experiencia_Laboral.bulkCreate(experiencias);
        } 
        return res.send('Registro exitoso');
        
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al subir archivo' });
      }
    
})

module.exports = router;