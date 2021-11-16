const { DataTypes } = require('sequelize');

function crateSchema(db) {
    const itemTypes = db._options?.itemTypes;
    if (!itemTypes || !Array.isArray(itemTypes)) throw new Error('Missing itemTypes array property');

    return {
        id: {
            type: DataTypes.STRING,
            primaryKey: true,
            allowNull: false,
            validate: {
                async isUnique(value) {
                    const existing = await db.models.crate.findOne({ where: { id: value }, raw: true });
                    if (existing?.length > 0) {
                        throw new Error(`Crate with id "${value}" already exists`)
                    }
                }
            }
        },
        displayName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        contains: {
            type: DataTypes.JSON,
            allowNull: false,
            validate: {
                async validate(value) {
                    for (const _item of value) {
                        if (!_item?.id || !_item?.quantity || !_item?.type) {
                            throw new Error('Item is missing a property, needs "id", "quantity" & "type"');
                        }

                        const { id, quantity, type } = _item;

                        // Validate type
                        if (!itemTypes.includes(type)) {
                            throw new Error(`Invalid item type "${type}" must be one of ${itemTypes.map(t => `"${t}"`).join(', ')}`);
                        }

                        // Validate quantity
                        const max = Number.MAX_SAFE_INTEGER;
                        const min = 1;
                        if (quantity > max) {
                            throw new Error(`Maximum quantity is "${max}"`);
                        }
                        if (quantity < min) {
                            throw new Error(`Minimum quantity is "${min}"`);
                        }

                        // Item
                        switch (type) {
                            case 'item':
                                if (!await db.models.item.findOne({ where: { id }, raw: true })) {
                                    throw new Error(`Invalid item ID provided "${id}"`)
                                }
                                break;
                            case 'role':
                                if (!await db.models.role.findOne({ where: { id }, raw: true })) {
                                    throw new Error(`Invalid role ID provided "${id}"`)
                                }
                                break;
                            case 'crate':
                                if (!await db.models.crate.findOne({ where: { id }, raw: true })) {
                                    throw new Error(`Invalid crate ID provided "${id}"`)
                                }
                                break;
                        }
                    }
                }
            }
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


module.exports = { name: 'crate', schema: crateSchema }
