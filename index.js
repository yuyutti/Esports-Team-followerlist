const express = require('express')
const app = express()
const SteinStore = require("stein-js-client");
const basicAuth = require("express-basic-auth")
require('dotenv').config();
const store = new SteinStore(process.env.API_URL);

process.on('uncaughtException', function(err) {
  console.log(err);
});

app.use(express.static('./'));

app.set('view engine', 'ejs')

app.listen(3003, function(){
  console.log('起動完了 => Express')
})

app.get('/',(req, res) => {
  store.read("index", {authentication: { username: process.env.API_USER, password: process.env.API_KEY }}).then(data => {
    res.render('index',{data:data});
  });
})