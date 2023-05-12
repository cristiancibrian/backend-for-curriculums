const sequelize = require('../db/sequelize');
const { DataTypes } = require('sequelize');
const Informacion_Personal = require('./Informacion_Personal');

const Experiencia_Laboral = sequelize.define('Experiencia_Laboral', {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    informacion_personal_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    lugar_trabajo: DataTypes.STRING,
    puesto: DataTypes.STRING,
    sueldo: DataTypes.STRING,
    descripcion_actividades: DataTypes.STRING
});

module.exports = Experiencia_Laboral;