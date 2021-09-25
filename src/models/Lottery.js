const { DataTypes } = require('sequelize');

const lotterySchema = {
    id:            { type: DataTypes.STRING, notNull: true, primaryKey: true },
    data:       { type: DataTypes.INTEGER, notNull: true, defaultValue: 0 },
};


module.exports = { name: 'lottery', schema: lotterySchema }
