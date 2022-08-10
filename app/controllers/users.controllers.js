const db = require("../models");
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const Users = db.users;


// Create and Save a new Tutorial
exports.create = async (req, res) => {
  // Validate request
  if (!req.body.email || !req.body.password || !req.body.name) {
    res.status(400).send({
      message: "Name,E-Mail and password can not be empty!",
    });
    return;
  }

  // Create a USER
  let salt = await bcrypt.genSalt(10);
  let hashpass = await bcrypt.hash(req.body.password, salt);
  const user = {
    user_id: req.body.user_id,
    name: req.body.name,
    company: req.body.company,
    email: req.body.email,
    password: hashpass
  };

  // Save Users in the database
  Users.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the users.",
      });
    });
  send_mail(req.body.email);
};


// sending mail to the new registered user!!
let send_mail = (email) => {

  const token1 = jwt.sign({
    email: email
  },
    'Secret_Key',
    {
      expiresIn: '24h'
    }
  );

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: 'farhan147khan147@gmail.com',
      pass: 'cmwoguueymueuese'
    }
  });

  let mailOptions = {
    from: 'farhan147khan147@gmail.com',
    to: email,
    subject: 'Registration Successful',
    html: '<p> Dear user!! Thank you for starting up your freetrial, we are really sure that you will love this!! This trial is only valid for 15 days, You need to take a subscription plan to continue using ScreenCapture!! For verifying your account click here <a href="http://localhost:3000/verify-email?token=' + token1 + '"> Verify </a></p>'
  }

  transporter.sendMail(mailOptions);
}


// Logging in to your account and generating an access token.
exports.findOne = (req, res) => {
  const email = req.body.email;
  Users.findOne({ where: { email } })
  .then((data) => {
    if (!data) {
      res.status(404).send({
        message: 'User does not exist!',
      });
    }
    else {
      bcrypt.compare(req.body.password, data.password, (err, result) => {
        if (!result) {
          res.status(400).json({ message: 'incorrect password' });
        }
        if (result) {
          const token = jwt.sign({
            name: data.name,
            email: data.email
          },
            'Secret_Key',
            {
              expiresIn: '24h'
            }
          );
          res.json({
            user_id: data.user_id,
            email: data.email,
            name: data.Name,
            token: token
          })
        }
      })
    }
  })
};

// for getting users based on site_id
exports.find = (_req, res) => {
  Users.findAll().then((data) => {
    res.send(data);
  })

}


// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
//   const id = req.params.id;

//   Tutorial.update(req.body, {
//     where: { id: id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "Tutorial was updated successfully.",
//         });
//       } else {
//         res.send({
//           message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Error updating Tutorial with id=" + id,
//       });
//     });
// };

// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
//   const id = req.params.id;

//   Tutorial.destroy({
//     where: { id: id },
//   })
//     .then((num) => {
//       if (num == 1) {
//         res.send({
//           message: "Tutorial was deleted successfully!",
//         });
//       } else {
//         res.send({
//           message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`,
//         });
//       }
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message: "Could not delete Tutorial with id= " + id,
//       });
//     });
// };



// exports.find = (req, res) => {
//   const email = req.query.email;
//   let condition = email ? { email: { [Op.like]: `%${email}%` } } : null;

//   Users.findAll({ where: condition })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials.",
//       });
//     });
// };

// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
//   Tutorial.destroy({
//     where: {},
//     truncate: false,
//   })
//     .then((nums) => {
//       res.send({ message: `${nums} Tutorials were deleted successfully!` });
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while removing all tutorials.",
//       });
//     });
// };

// // find all published Tutorial
// exports.findAllPublished = (req, res) => {
//   Tutorial.findAll({ where: { published: true } })
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((err) => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving tutorials.",
//       });
//     });
// };








