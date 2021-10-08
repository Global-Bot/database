const { DataTypes } = require('sequelize');

const cooldownSchema = {
    num:           { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    id:            { type: DataTypes.STRING, notNull: true },
    type:          { type: DataTypes.STRING, notNull: true },
    expire:        { type: DataTypes.BIGINT, notNull: true }
};


module.exports = { name: 'cooldown', schema: cooldownSchema }
