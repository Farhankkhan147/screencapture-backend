const db = require("../models");
const Tasks = db.tasks;
const Attachments = db.attachments;
const Users = db.users;
const main = require('./main1');


// posting a task to the database.
exports.create = async (req, res) => {


  let user_id = main.config.account_id;
  let user = await Users.findOne({ where: {user_id}})

  const task = {
    task_id: req.body.task_id,
    task: req.body.task,
    task_description: req.body.task_description,
    created_by: user.dataValues.name,
    assignee: req.body.assignee,
    priority: req.body.priority,
    x: req.body.x,
    y: req.body.y,
    url: req.body.url,
    site_id: main.config.site_id
  }

  Tasks.create(task)
    .then((data) => {
      if (req.files) {
        for (i = 0; i < req.files.length; i++) {
          Attachments.create({ attachment_type: req.files[i].mimetype, attachment_name: req.files[i].originalname, task_id: data.task_id });
        }
      }
      res.send(data);
    })
}

// getting all the tasks
exports.findAll = (_req, res) => {
  Tasks.findAll({where: {site_id:main.config.site_id}}).then((data) => {
    res.send(data)
  })
}
