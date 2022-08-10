const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.model.js")(sequelize, Sequelize);
db.sites = require("./sites.model.js")(sequelize, Sequelize);
db.attachments = require("./attachments.model.js")(sequelize, Sequelize);
db.tasks = require('./tasks.model.js')(sequelize, Sequelize);
db.comments = require('./comments.model.js')(sequelize, Sequelize);
db.tokens = require('./tokens.models.js')(sequelize, Sequelize);

// Initializing relationships.
db.tasks.hasMany(db.comments, {foreignKey: 'task_id'}, {onDelete : 'CASCADE'}, {onUpdate : 'CASCADE'});
db.tasks.hasMany(db.attachments, {foreignKey : 'task_id'}, {onDelete : 'CASCADE'}, {onUpdate : 'CASCADE'});

db.users.belongsToMany(db.sites, { through: 'Site_Users' });
db.sites.belongsToMany(db.users, { through: 'Site_Users' });

module.exports = db;
