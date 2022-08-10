module.exports = (sequelize, Sequelize) => {
  const users = sequelize.define("users", {
    user_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull : false
    },
    company: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    is_verified: {
      type: Sequelize.BOOLEAN,
    }
  });

  return users;
};
