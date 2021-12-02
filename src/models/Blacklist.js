const { DataTypes } = require('sequelize');

const BlacklistSchema = {
    user: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            is: /\d{15,23}/mg,
            len: [ 15, 25 ]
        }
    },
    blacklisted: {
        type: DataTypes.BOOLEAN,
        notNull: true,
        defaultValue: false
    },
};


module.exports = { name: 'blacklist', schema: BlacklistSchema }
