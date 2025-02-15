const { DataTypes } = require('sequelize');

function inventorySchema(db) {
    const itemTypes = db._options?.itemTypes;
    if (!itemTypes || !Array.isArray(itemTypes)) throw new Error('Missing itemTypes array property');
    
    return {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        user: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: /\d{15,23}/mg,
                len: [ 15, 25 ]
            }
        },
        itemID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            validate: {
                max: Number.MAX_SAFE_INTEGER,
                min: 1,
                isNumeric: true,
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [ itemTypes ],
            }
        },
        inUse: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false
        }
    };
}

function inventoryHooks(db) {
    async function beforeCreate(instance) {
        const { itemID, type } = instance;

        const model = db.models[type];
        if (!model) throw new Error(`Unable to find model from item type "${type}"`);

        const existingItem = await model.findOne({ where: { id: itemID } });
        if (!existingItem) throw new Error(`Unable to find the ${itemID} ${type}`);
    }

    async function beforeBulkUpdate(instance) {
        return await beforeCreate(instance.where)
    }

    return { beforeCreate, beforeBulkUpdate };
}


module.exports = { name: 'inventory', schema: inventorySchema, hooks: inventoryHooks }
