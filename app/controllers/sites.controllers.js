const db = require("../models");
const uuid = require('uuid');
const Sites = db.sites;
const Tokens = db.tokens;

// create a new site
exports.create = async (req, res) => {

  const site = {
    site_id: req.body.site_id,
    site_name: req.body.site_name,
    user_id: req.body.user_id,
    script: req.body.script
  }

  Sites.create(site)
    .then(() => {
      let token2 = uuid.v1();
      let ab = "<script type='text/javascript'>(function (d, t) {let pp = d.createElement(t), s = d.getElementsByTagName(t)[0];pp.src = 'http://192.168.0.74:8080/embed/farhan/';pp.type = 'text/javascript';pp.async = true;s.parentNode.insertBefore(pp, s);})(document, 'script');</script>"
      let ba = ab.split('farhan/');
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(ba[0] + token2 + ba[1]);
      let token = {
        token_id: req.body.token_id,
        user_id: req.body.user_id,
        site_id: req.body.site_id,
        token: token2
      };
      Tokens.create(token);        
    })
    .catch((err) => {
      console.log(err);
    })
}

// getting all sites
exports.findAll = (_req, res) => {
  // let user_id = req.body.user_id;
  Sites.findAll().then((data) => {
    res.send(data);
  })
}

// returning the config object.
exports.main = async (req, res) => {
  
  let token = req.params.token;
  Tokens.findOne({ where: {token}})
  .then((data) => {
    let site_id = data.site_id;
    let user_id = data.user_id;

    let a1 = 'http://192.168.0.74:8080/embed/frame/farhan//farhan/';
    let b1 = a1.split('farhan/');
    let c1 = b1[0] + site_id + b1[1] + user_id;

    let a2 = 'http://192.168.0.74:8080/embed/toolbar/farhan//farhan/';
    let b2 = a2.split('farhan/');
    let c2 = b2[0] + site_id + b2[1] + user_id;
    
    let config = {
      user_id: user_id,
      site_id: site_id,
      position: 'bottom-right',
      app_url: 'http://192.168.0.74:8080/embed',
      frame_src: c1,
      toolbar_src: c2,
      source: '',
      theme: '',
      guest: 0
    };

    // let config = JSON.stringify(config1);
    // fs.writeFileSync(__dirname+'/main.js', JSON.stringify(config),{flag: 'a+'}, (err, result) => {
    //   if(err) throw err;
    //   console.log('changed');
    // })
    res.sendFile(__dirname + '/main.js', (err, result) => {
      if(err) throw err;
      console.log(result);
    });

  })   
}
 
// rendering frame.html
exports.frame = (_req, res) => {
  res.sendFile(__dirname + '/frame.html');
}

exports.toolbar = (_req, res) => {
  res.sendFile(__dirname + '/toolbar.html');
}

// sorting sites by name
exports.sortName = (_req, res) => {
  Sites.findAll({ order: [['site_name']]}).then((data) => {
    res.send(data);
  })
}

//sorting newest sites
exports.sortNewest = (_req, res) => {
  Sites.findAll({ order: [['createdAt', 'DESC']]}).then((data) => {
    res.send(data);
  })
}

//sorting oldest sites
exports.sortOldest = (_req, res) => {
  Sites.findAll({ order: [['createdAt']]}).then((data) => {
    res.send(data);
  })
}

