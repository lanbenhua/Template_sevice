const express = require('express'),
      router = express.Router(),
      fs = require('fs'),
      monk = require('monk'),
      path = require('path');

/* biz-flow */
router.get('/:tpl', (req, res, next)=> {
  let tplDataId = req.query.data_id;
  if(!tplDataId){
    return res.render('error',{ layout:false, error: '未提供数据ID' });
  }
  let tplDataCol = req.db.get('tpl_data'), submitDataCol = req.db.get('submit_data');
  
  tplDataCol.findOne({_id:monk.id(tplDataId)})
  .then((doc)=>{
     if(!doc) return res.render('error',{ layout:false,error: `渲染模版的数据${tplDataId}已经不存在（可能因过期而被清除）` });
     return Promise.all([doc, submitDataCol.findOne({uid:doc.uid,tpl:req.params.tpl})]);
  })
  .then(([doc,lastSubmit])=>{
     fs.access(path.join(__dirname, '..', 'public', 'biz-flow', req.params.tpl + '.js'), fs.constants.F_OK, (err)=>{
        res.render(`biz-flow/${req.params.tpl}`, 
           Object.assign({uid:doc.uid,tpl:req.params.tpl,lastSubmit:(lastSubmit ? lastSubmit.payload : {}) },doc.payload,
               { 
                body_script: err ? '' :  `<script src="./${req.params.tpl}.js"></script>`
               })
        )
     });
  })
  .catch((err)=>{
    console.error(err);
    res.render('error',{ layout:false, error: `系统错误：${err.message || err.toString()}` });
  });
});

router.post('/submit', (req,res,next)=>{
    let {uid,tpl} = req.body;
    if(!uid || !tpl) return res.status(400).send({error:'缺少必要参数uid和tpl'});
    let submitDataCol = req.db.get('submit_data');
    submitDataCol.findOne({uid,tpl})
    .then((doc)=>{
        if(!doc) {
            return submitDataCol.insert(req.body);
        }
        else {
            return submitDataCol.update({_id:doc._id},req.body);
        }
    })
    .then((doc)=>{
        res.json(doc);
    })
    .catch((err)=>{
        console.error(err);
        res.status(500).send({error:err.message || err.toString() });
    });
});

module.exports = router;
