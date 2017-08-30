const jwt = require('jsonwebtoken');

function jwtErrMsg(err){
    let s = err.message || err.toString();
    console.log("jwtErrMsg",s);
    if(s.match(/expired/)) return 'token已过期';
    else return s;
}

exports.verifyToken = (req,res,next)=>{
    let token = req.query.token || req.body.token;
    delete req.body.token;

    if(!token){
      if(req.method == 'GET' && process.env.DISABLE_TOKEN == 'true') return next();
      return res.render('error',{ layout:false, error: '未提供参数token' });
    }

    jwt.verify(token, req.config.jwt_token_secret, (err, decoded)=>{
       if(err) return res.render('error',{ layout:false, error: jwtErrMsg(err) });  
       req.token_payload = decoded;
       console.log('token_payload',req.token_payload);
       next(); 
    });
};

exports.createSubmitToken = (payload,config)=>{
    return new Promise((resolve,reject)=>{
        jwt.sign(payload, config.jwt_token_secret, { expiresIn: config.submit_token_ttl }, (err,token)=>{
            if(err) reject(err);
            else resolve(token);
        });
    });
};