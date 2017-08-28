const express = require('express'),
      router = express.Router(),
      fs = require('fs'),
      monk = require('monk'),
      path = require('path'),
      {createSubmitToken} = require('./token-utils');

function createTrack(req,renderData){
     let trackDataCol = req.db.get('track_data');
     return trackDataCol.insert({
         uid: renderData.uid,
         tpl: req.params.tpl,
         token:req.token_payload,
         render: renderData.payload,
         renderTime: new Date()
     }).
     then(doc=>{
        return createSubmitToken({track_id:doc._id.toString()},req.config);
     });
}

/* biz-flow */
router.get('/:tpl', (req, res, next)=> {
  let {data_id:tplDataId} = req.query;
  if(!tplDataId){
    return res.render('error',{ layout:false, error: '未提供参数data_id' });
  }
  let tplDataCol = req.db.get('tpl_data'), submitDataCol = req.db.get('submit_data');
  
  tplDataCol.findOne({_id:monk.id(tplDataId)})
  .then((doc)=>{
     if(!doc) throw new Error(`渲染模版的数据${tplDataId}已经不存在（可能因过期而被清除）`);
     return Promise.all([doc, submitDataCol.findOne({uid:doc.uid,tpl:req.params.tpl}), createTrack(req,doc)]);
  })
  .then(([doc,lastSubmit,submitToken])=>{
     fs.access(path.join(__dirname, '..', 'public', 'biz-flow', req.params.tpl + '.js'), fs.constants.F_OK, (err)=>{
        res.render(`biz-flow/${req.params.tpl}`, 
           Object.assign({
                  uid:doc.uid,
                  tpl:req.params.tpl,
                  lastSubmit:(lastSubmit ? lastSubmit.payload : {}),
                  submitToken
               },
               doc.payload,
               { 
                body_script: err ? '' :  `<script src="./${req.params.tpl}.js"></script>`
               })
        )
     });
  })
  .catch((err)=>{
    console.error(err);
    res.render('error',{ layout:false, error: err.message || err.toString() });
  });
});

router.post('/submit', (req,res,next)=>{
    let {uid,tpl} = req.body;
    if(!uid || !tpl) return res.status(400).send({error:'缺少必要参数uid和tpl'});
    console.log('payload',req.body.payload,req.token_payload);
    let submitDataCol = req.db.get('submit_data'), trackDataCol = req.db.get('track_data');
    submitDataCol.findOne({uid,tpl})
    .then((doc)=>{
        let updateTrack = trackDataCol.update({
             _id:monk.id(req.token_payload.track_id),
             uid,
             tpl
            },
           {$set:{submit:req.body.payload,submitTime:new Date()}});
        if(!doc) {
            return Promise.all([submitDataCol.insert(req.body),updateTrack]);
                  
        }
        else {
            return Promise.all([submitDataCol.update({_id:doc._id},req.body),updateTrack]);
        }
    })
    .then(([doc])=>{
        res.json(doc);
    })
    .catch((err)=>{
        console.error(err);
        res.status(500).send({error:err.message || err.toString() });
    });
});

module.exports = router;
