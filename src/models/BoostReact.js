const { DataTypes } = require('sequelize');

const boostReactSchema = {
    id:            { type: DataTypes.STRING, notNull: true, primaryKey: true },
    reaction:      { type: DataTypes.STRING, notNull: true },
    word:          { type: DataTypes.STRING, notNull: true },
};


module.exports = { name: 'boostReact', schema: boostReactSchema }
