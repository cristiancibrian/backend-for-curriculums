const { check } = require('express-validator');

const validarCampos = [
    check('nombre').notEmpty().withMessage('El campo "nombre" es obligatorio'),
    
];

module.exports = validarCampos;