const { DataTypes } = require('sequelize');

const CountrySchema = {
    user: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            is: /\d{15,23}/mg,
            len: [ 15, 25 ]
        }
    },
    country: DataTypes.STRING
};


module.exports = { name: 'country', schema: CountrySchema }
