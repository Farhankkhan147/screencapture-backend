const multer = require('multer');
const path = require('path');

module.exports = app => {
  const tasks = require('../controllers/tasks.controllers.js')

  let router = require("express").Router();

  // using multer to upload files.
  let storage = multer.diskStorage({
    destination: (req, file, callBack) => {
      if (file.mimetype == 'image/png' || file.mimetype == 'image/jpeg' || file.mimetype == 'image/jpg') {
        callBack(null, 'screenshots')     
      }
      else if (file.mimetype == 'audio/mpeg' || file.mimetype == 'video/mp4') {
        callBack(null, 'screenrecordings')
      }
      else {
        callBack(null, 'attachments')     
      }
    },
    filename: (req, file, callBack) => {
      callBack(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
  })

  let upload = multer({
    storage: storage
  });

  // route to post the task and its attachments to the database.
  router.post('/new-task', upload.array('attachment_name'), tasks.create);

  // route to get all the tasks.
  router.get('/tasks', tasks.findAll);
  
  // route to render 
  app.use(router);
};
