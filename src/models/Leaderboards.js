const { DataTypes } = require('sequelize');

const leaderboardSchema = {
    type:            { type: DataTypes.STRING, notNull: true },
    channel_id:          { type: DataTypes.STRING, notNull: true },
    message_id:        { type: DataTypes.STRING, notNull: true }
};


module.exports = { name: 'leaderboard', schema: leaderboardSchema }
