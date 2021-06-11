const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');

const hostname = 'localhost';
const port = 3001;

app.use(cors());

//Database connection
mongoose.connect('mongodb://localhost/signup', {useNewUrlParser: true, useUnifiedTopology: true});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

app.post('/signup',function(req,res){

    var fullname=req.body.fullname;
    var email=req.body.email;
    var password=req.body.password;
    var confirmpassword=req.body.confirmpassword;
    var role=req.body.role;

  var SignUpSchema = mongoose.Schema({
    fullname:String,
    email:String,
    password:String,
    confirmpassword:String,
    role:String
  });

  // compile schema to model
  var User = mongoose.model('User', SignUpSchema, 'users');

  // a document instance
  var User1 = new User({fullname: fullname,email: email,password: password,confirmpassword:confirmpassword,role: role  });

  // save model to database
  User1.save(function (err, data) {
    if (err) {
      res.send({status:0,result:err})
    } else{
      res.send({status:1,result:data})
    }
    
  });
})

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
