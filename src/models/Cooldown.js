const { DataTypes } = require('sequelize');

const cooldownSchema = {
    id:            { type: DataTypes.STRING, notNull: true, primaryKey: true },
    type:          { type: DataTypes.STRING, notNull: true },
    expire:        { type: DataTypes.BIGINT, notNull: true }
};


module.exports = { name: 'cooldown', schema: cooldownSchema }
