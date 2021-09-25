const { DataTypes } = require('sequelize');

const interactionSchema = {
    id:            { type: DataTypes.STRING, notNull: true, primaryKey: true },
    data:       { type: DataTypes.JSON, notNull: true, defaultValue: {} },
};


module.exports = { name: 'interaction', schema: interactionSchema }
