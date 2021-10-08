const { DataTypes } = require('sequelize');

function itemSchema(db) {
    const options = db._options;
    if (!options?.itemTypes || !Array.isArray(options?.itemTypes)) throw new Error('Missing itemTypes array property');

    return {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            validate: {
                async isUnique(value) {
                    const existing = await db.models.item.findOne({ where: { id: value }, raw: true });
                    if (existing?.length > 0) {
                        throw new Error(`Item with id "${value}" already exists`)
                    }
                }
            }
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false
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
    }
}


module.exports = { name: 'item', schema: itemSchema }
