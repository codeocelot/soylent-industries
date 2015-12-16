var mongoose = require('mongoose');
mongoose.connect(process.env.mongouri || 'mongodb://localhost/test');
var passGen = require('password-generator')

var User = mongoose.model('User',
  {email:String,password:String}
)

// User.find(function(err,users){
//   console.log(users);
// });

function findUser(email,cb){
  User.findOne({email},(err,person)=>cb(person))
}

function registerUser(email,cb){
  try{
    var password = passGen();
    var user = new User({email,password})
    user.save();
  } catch(e){
    return cb(e,null);
  }
  cb(null,user);
}

registerUser('randomemail@email.com',(err,user)=>console.log(`${user} created`))

module.exports = {
  find:findUser,
  register:registerUser
}
