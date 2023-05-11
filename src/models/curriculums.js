const sequelize = require('../db/sequelize');
const { DataTypes } = require('sequelize');

const Curriculum = sequelize.define('Curriculum', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
    },
    foto: {
        type: DataTypes.STRING,
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido_paterno: {
        type: DataTypes.STRING,
        allowNull: false
    },
    apellido_materno: {
        type: DataTypes.STRING,
    },
    fecha_nacimiento: {
        type: DataTypes.DATE
    },
    telefono: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lugar_trabajo: {
        type: DataTypes.STRING
    },
    puesto: {
        type: DataTypes.STRING
    },
    sueldo: {
        type: DataTypes.STRING
    },
    descripcion_actividades: {
        type: DataTypes.STRING
    },
})

module.exports = Curriculum;