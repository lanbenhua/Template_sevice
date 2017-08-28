const express = require('express'),
      router = express.Router();

/* tpl-data */
router.post('/', function(req, res, next) {
   let uid = req.query.uid || req.body.uid;
   if(!uid) res.status(400).send({ error: '缺少uid参数'});
   delete req.body.uid;

   req.db.get('tpl_data').insert({
            payload: req.body,
            uid,
            createdAt:new Date()
        })
        .then(({createdAt,_id:data_id})=>{
            res.json({
                data_id,
                createdAt,
                expiredAt: new Date(createdAt.getTime() + req.config.tpl_data_ttl * 1000)
            });
        })
        .catch((err)=>{
            console.error(err);
            res.status(500).send({ error: err.message || err.toString() });
        });
});

module.exports = router;
