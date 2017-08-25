const express = require('express'),
      router = express.Router();

/* tpl-data */
router.post('/', function(req, res, next) {
   req.db.get('tpl_data').insert({
            payload:req.body,
            uid: req.query.uid || req.body.uid,
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
