
const alert = require('alert-node');
const express = require('express');
const app = express();
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
var bodyparser = require('body-parser')
var multer = require('multer')
var upload =multer({ dest: 'uploads/'})

const adapter = new FileSync('database.json')
const db = low(adapter)


app.use(bodyparser.json())//to use a function inside the node app
app.use(bodyparser.urlencoded({extended:true}))

//get has the route as the first param and the funcyion to be execeuted as the second param
//
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/cp.html'));//joining to paths
});

app.post('/login_check', (req, res) => {
 if 	(db.get('users').find({'roomno' : req.body.roomno}).value().password == req.body.password){
 	//console.log("user logged in")
 	return res.redirect('/cp1');
 } 	 
else
	{
			alert('invalid credentials')
			return res.redirect('/cp');	
	 } 
 
 //res.redirect('cp1')
});

app.post('/cp_data',upload.any(),(req,res)=>{
		var name = req.body.originalname;
		console.log(name);
		res.send(req.files);
});
app.get('/cp', (req, res) => {
  res.sendFile(path.join(__dirname, '/cp.html'));
});

app.get('/cp1', (req, res) => {
  res.sendFile(path.join(__dirname, '/cp1.html'));
});

app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});

//console.log(db.get('users').find({'roomno' : '1'}).value())

