'use strict'
var pg = require('pg');
var conString = "postgres://postgres:postgres@localhost/soylent";
var _ = require('underscore')

var app = require('express')();

function getIngredients(name,cb){
  pg.connect(conString,(err,client,done)=>{
    if(err){
      cb(err,null);
    }
    client.query(`select * from food_des where long_desc = '${name}' LIMIT 1`,(err,foodRes)=>{
      let food = foodRes.rows[0]
      debugger;
      client.query(`select * from nut_dat JOIN nutr_def on nutr_def.nutr_no = nut_dat.nutro_no WHERE nut_dat.ndb_no = '${food.ndb_no}'`,(err,nutrients)=>{
        food.nutrients = nutrients.rows;
        cb(null,food);
      })
    });
  })
}

function getIngredientNames(cb){
  pg.connect(conString,(err,client,done)=>{
    if(err) return cb(err,null);
    client.query(`select long_desc from food_des`,(err,foodRes)=>{
      let foods = foodRes.rows.map(f=>{return f.long_desc})
      cb(null,foods)
    })

  })
}

app.use((req,res,next)=>{res.set('Access-Control-Allow-Origin',"*");next();})
app.use((req,res,next)=>{console.log(`Request: ${req.path} ${JSON.stringify(req.params)}`);next();})

app.get('/ingredient/all',(req,res)=>{
  getIngredientNames((err,ingreds)=>res.send(err||ingreds).status(err?500:200))
})

app.get('/ingredient/:name',(req,res)=>{
  getIngredients(req.params.name || null,(err,result)=>{
    if(err) res.send(err.toString()).status(500);
    else res.send(result).status(200);
  })
});



var server = app.listen(process.env.port || 3000, ()=>{
  var host = server.address().address;
  var port = server.address().port;
  console.log('Server listening on http://%s:%s',host,port);
} )
