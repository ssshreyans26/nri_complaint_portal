
const alert = require('alert-node');
const express = require('express');
const app = express();
const path = require('path');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')
var bodyparser = require('body-parser')
var multer = require('multer')
var upload =multer({ dest: path.join(__dirname, '../myapp/uploads')})
const adapter = new FileSync('database.json')
const db = low(adapter)
app.set('views' , path.join(__dirname, 'views'))
app.set('view engine', 'pug');



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
	
	
		var name = req.files;
		// console.log(name[0].originalname);
		var filenames = name[0].filename; //accessing first member of json array
		console.log(filenames);
		var detail = req.body.comment;
		var roomno = req.body.roomno;

		db.get('complaint_detail_students').push({'roomno':roomno,
		'detail': detail,
		'imgurl':filenames, }).write();
			return res.redirect('/cp2');
			// assert.equal(null,err);
		});


// app.post('/cp_data', upload.single('filename'), function(req, res) {
//   if (req.file) {
//     console.dir(req.file);accepts file whose starting is 'foo'
//     return res.end('Thank you for the file');
//   }
//   res.end('Missing file');
// });


// app.get('/cp2',(req,res)=>{
// 	var a = (db.get('complaint_detail_students').value());
// 	res.send(a);
	 
			
// });

app.get('/cp', (req, res) => {
  res.sendFile(path.join(__dirname, '/cp.html'));
});
app.get('/cp2', (req, res) => {
	res.render('cp2')
  });

app.get('/cp1', (req, res) => {
  res.sendFile(path.join(__dirname, '/cp1.html'));
});


	
 



app.listen(8000, () => {
  console.log('Example app listening on port 8000!')
});

//console.log(db.get('users').find({'roomno' : '1'}).value())