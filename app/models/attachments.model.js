

module.exports = (sequelize, Sequelize) => {
  const attachments = sequelize.define("attachments", {
    attachment_id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    attachment_type: {
      type: Sequelize.STRING
    },
    attachment_name: {
      type: Sequelize.STRING,
    },
    task_id: {
      type: Sequelize.INTEGER,
    },
  });




  return attachments;
};
