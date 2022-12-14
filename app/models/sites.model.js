module.exports = (sequelize, Sequelize) => {
    const sites = sequelize.define("sites", {
      site_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      site_name: {
        type: Sequelize.STRING,
        allowNull : false
      },
      user_id: {
        type: Sequelize.INTEGER,
      },
    });
  
    return sites;
  };
  