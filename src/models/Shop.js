const { DataTypes } = require('sequelize');

function shopSchema(db) {
    const itemTypes = db._options?.itemTypes;
    if (!itemTypes || !Array.isArray(itemTypes)) throw new Error('Missing itemTypes array property');
    
    return {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        itemID: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                isIn: [ itemTypes ],
            }
        },
        requiredLevel: {
            type: DataTypes.BIGINT,
            notNull: true,
            defaultValue: 0
        }
    };
}

function shopHooks(db) {
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


module.exports = { name: 'shop', schema: shopSchema, hooks: shopHooks }
