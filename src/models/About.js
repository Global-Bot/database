const { DataTypes } = require('sequelize');

const AboutSchema = {
    user: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            is: /\d{15,23}/mg,
            len: [ 15, 25 ]
        }
    },
    about: DataTypes.STRING
};


module.exports = { name: 'about', schema: AboutSchema }
