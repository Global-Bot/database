const { DataTypes } = require('sequelize');

const boostReactSchema = {
    id:            { type: DataTypes.STRING, notNull: true, primaryKey: true },
    reaction:      { type: DataTypes.STRING, notNull: true, defaultValue: 0 },
};


module.exports = { name: 'boostReact', schema: boostReactSchema }
