const { DataTypes } = require('sequelize');

const XPSchema = {
    user: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            is: /\d{15,23}/mg,
            len: [ 15, 25 ]
        }
    },
    xp: {
        type: DataTypes.BIGINT,
        notNull: true,
        defaultValue: 0
    },
    messages: {
        type: DataTypes.BIGINT,
        notNull: true,
        defaultValue: 0
    },
    weeklyMessages: {
        type: DataTypes.BIGINT,
        notNull: true,
        defaultValue: 0
    },
    blacklisted: {
        type: DataTypes.BOOLEAN,
        notNull: true,
        defaultValue: false
    },
};


module.exports = { name: 'xp', schema: XPSchema }
