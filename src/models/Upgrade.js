const { DataTypes } = require('sequelize');

const UpgradeSchema = {
    id: {
        type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        validate: {
            async isUnique(value) {
                const existing = await db.models.upgrade.findOne({ where: { id: value }, raw: true });
                if (existing?.length > 0) {
                    throw new Error(`Upgrade with id "${value}" already exists`)
                }
            }
        }
    },
    displayName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    XPMultiplier: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    starMultiplier: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        defaultValue: 0
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            max: Number.MAX_SAFE_INTEGER,
            min: 0,
            isNumeric: true,
        }
    }
};


module.exports = { name: 'upgrade', schema: UpgradeSchema }
