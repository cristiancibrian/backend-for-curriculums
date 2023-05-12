const sequelize = require('../db/sequelize');
const { DataTypes } = require('sequelize');
const Experiencia_Laboral = require('./Experiencia_Laboral');

const Informacion_Personal = sequelize.define('Informacion_Personal', {
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
    }
})

Informacion_Personal.hasMany(Experiencia_Laboral, {
    foreignKey: 'informacion_personal_id'
});

module.exports = Informacion_Personal;