const { Sequelize } = require('sequelize');
const fs            = require('fs');
const path          = require('path');

const basename      = path.basename(module.filename);
const modelPath     = path.join(__dirname, 'models');

class DataBase {
    constructor(options) {
        if (!options.db) throw new Error('Missing db property');
        
        this.logger = options.logger || console;
        this._models = {};
        this._options = options;
        
        this.logger.info('Connecting to Global database...');
        
        const connectionOptions = {
            database: null,
            username: null,
            password: null,
            host:     'localhost',
            dialect:  'mysql',
            port:     3306,
            logging:  false,
            define: {
                freezeTableName: true
            }
        }
        
        this._sequelize = new Sequelize(connectionOptions.database, connectionOptions.username, connectionOptions.password, Object.assign(connectionOptions, options.db));
        
        (async () => {
            try {
                await this._sequelize.authenticate();
                this.logger.info('Connected to Global database.');
            } catch (error) {
                this.logger.error('Unable to connect to Global database:', error.message);
            }
        })();

        fs
            .readdirSync(modelPath)
			.filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
			.forEach(file => {
				const model = require(path.join(modelPath, file));
				this.registerModel(model);
			});
    }

    get models() {
        return this._models;
    }
    
    get sequelize() {
        return this._sequelize;
    }

    registerModel({ name, schema, hooks = {}, doNotSync }) {
        const model = this.sequelize.define(name, typeof schema == 'function' ? schema(this) : schema, { hooks });
        if (doNotSync != true) {
            model.sync();
        }

        this._models[model.name] = model;
    }
}


module.exports = DataBase;
