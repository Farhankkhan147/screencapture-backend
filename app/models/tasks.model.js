

module.exports = (sequelize, Sequelize) => {
    const tasks = sequelize.define("tasks", {
      task_id: {
        type: Sequelize.INTEGER,
        primaryKey : true,
        autoIncrement: true
      },
      task: {
        type: Sequelize.STRING,
        allowNull : false
      },
      task_description:{
        type:Sequelize.STRING,
        allowNull : false
      },
      created_by: {
        type: Sequelize.STRING
      },
      assignee: {
        type: Sequelize.STRING,
        allowNull : false
      },
      priority:{
        type: Sequelize.STRING,
        allowNull : false
      },
      x:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      y:{
        type: Sequelize.INTEGER,
        allowNull: false
      },
      url:{
        type: Sequelize.STRING,
        allowNull: false
      },
      site_id:{
        type: Sequelize.INTEGER,
        allowNull: false
      }

    });

    return tasks;
  };
  