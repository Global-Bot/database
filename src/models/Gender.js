const { DataTypes } = require('sequelize');

const GenderSchema = {
    user: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            is: /\d{15,23}/mg,
            len: [ 15, 25 ]
        }
    },
    gender: DataTypes.STRING
};


module.exports = { name: 'gender', schema: GenderSchema }
