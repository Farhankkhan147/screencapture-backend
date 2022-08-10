

module.exports = (sequelize, Sequelize) => {
    const comments = sequelize.define("comments", {
      comment_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      comment: {
        type: Sequelize.STRING,
        allowNull : false
      },
      task_id: {
        type: Sequelize.INTEGER,
      }

    });
  
    return comments;
  };
  