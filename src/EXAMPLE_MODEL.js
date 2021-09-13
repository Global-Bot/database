const { DataTypes } = require('sequelize');

const userSchema = {
    name:          { type: DataTypes.TEXT, notNull: true },
    favoriteColor: { type: DataTypes.TEXT, notNull: true, defaultValue: 'green' },
    age:           { type: DataTypes.INTEGER },
    cash:          { type: DataTypes.INTEGER }
};


module.exports = { name: 'user', schema: userSchema }
