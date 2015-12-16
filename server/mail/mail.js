// var mail = require('emailjs');
// var mailConfig = require('../secrets/secrets.js').mail
//
// var mailServer = mail.server.connect(mailConfig);
//
// mailServer.send({
//   text:'hello wrodl',
//   from:'food nutrition ',
//   to:'joeygracey@gmail.com',
//   subject:'testing emailjs'
// },(err,msg)=>{
//   if(err)console.log(err);
//   else console.log("Success: ", msg);
// })

var sendgrid = require('sendgrid')('joeygracey','fa1rma112')

var payload = {
  text:'hello wrodl',
  from:'food nutrition ',
  to:'joeygracey@gmail.com',
  subject:'testing emailjs'
}

sendgrid.send(payload,(err,json)=>{
  console.log(err?"ERROR"+err:json)
})
