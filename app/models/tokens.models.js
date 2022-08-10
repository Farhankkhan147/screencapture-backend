module.exports = (sequelize, Sequelize) => {
    const tokens = sequelize.define("tokens", {
      token_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      site_id: {
        type: Sequelize.INTEGER,
        allowNull : false
      },
      token : {
        type : Sequelize.STRING,
        allowNull : false
      }
    });
  
    return tokens;
  };