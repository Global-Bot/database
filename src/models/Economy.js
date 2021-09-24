const { DataTypes } = require('sequelize');

const economySchema = {
    id:            { type: DataTypes.STRING, notNull: true, primaryKey: true },
    stars:         { type: DataTypes.INTEGER, notNull: true, defaultValue: 0 },
};


module.exports = { name: 'economy', schema: economySchema }
