const express = require('express'),
      router = express.Router(),
      fs = require('fs'),
      path = require('path'),
      jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', (req, res, next)=>{
  fs.readdir(path.join(__dirname,'..','views','biz-flow'), (err,files)=>{
     if(err) return res.render('error',{ layout:false, error: err.message || err.toString() });
     res.render('index', { title: '已提供的业务模版',tplNames:files.map(f=>path.basename(f,'.hbs')) });
  });
});

if(! (process.env['NODE_ENV'] == 'production')){
    router.get('/jwt-token', (req,res,next)=>{
        jwt.sign({
          userAgent: req.get('User-Agent')
        }, req.config.jwt_token_secret, { expiresIn: req.config.tpl_data_ttl }, (err,token)=>{
            if(err) return res.status(500).json({error:err.message||err.toString()});
            res.json({token});
        });
    });
}

module.exports = router;
