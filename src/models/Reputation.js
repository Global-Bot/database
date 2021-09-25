const { DataTypes } = require('sequelize');

const reputationSchema = {
    id:            { type: DataTypes.STRING, notNull: true, primaryKey: true },
    reputation:    { type: DataTypes.INTEGER, notNull: true, defaultValue: 0 },
};


module.exports = { name: 'reputation', schema: reputationSchema }
