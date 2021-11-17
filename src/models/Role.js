const { DataTypes } = require('sequelize');

function roleSchema(db) {
    const options = db._options;
    if (!options?.itemTypes || !Array.isArray(options?.itemTypes)) throw new Error('Missing itemTypes array property');

    return {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            validate: {
                async isUnique(value) {
                    const existing = await db.models.role.findOne({ where: { id: value }, raw: true });
                    if (existing?.length > 0) {
                        throw new Error(`Role with id "${value}" already exists`)
                    }
                }
            }
        },
        role: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /\d{15,23}/mg,
                len: [ 15, 25 ]
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
        },
        inUse: {
            type: DataTypes.BOOLEAN,
            allowNull: false
        }
    }
}


module.exports = { name: 'role', schema: roleSchema }
