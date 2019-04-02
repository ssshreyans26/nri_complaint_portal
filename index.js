const alert = require("alert-node");
const express = require("express");
const app = express();
const path = require("path");
const low = require("lowdb");
const FileSync = require("lowdb/adapters/FileSync");
var bodyparser = require("body-parser");
var multer = require("multer");

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  }
});
var upload = multer({ storage: storage });

const adapter = new FileSync("database.json");
const db = low(adapter);
var cookieParser = require("cookie-parser");
app.use(cookieParser());
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");
var session = require("express-session");
app.use(session({ secret: "Shh, its a secret!" }));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(bodyparser.json()); //to use a function inside the node app
app.use(bodyparser.urlencoded({ extended: true }));

//get has the route as the first param and the funcyion to be execeuted as the second param
//
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "/cp.html")); //joining to paths
});

app.post("/login_check", (req, res) => {
  if (
    db
      .get("users")
      .find({ roomno: req.body.roomno })
      .value().password == req.body.password
  ) {
    //  console.log("user logged in" + users.roomno)
    req.session.user = req.body.roomno;
    console.log("consoled 1st time" + req.session.user);
    return res.redirect("/cp1");
  } else {
    alert("invalid credentials");
    return res.redirect("/cp");
  }

  //res.redirect('cp1')
});

app.post("/cp_data", upload.any(), (req, res) => {
  console.log("inside cp_data" + req.session.user);

  var requestbody = req.body;
  // console.log(Object.keys(req.body))
  
  var name = req.files;
  var originalname = name[0].originalname;
  var ext = originalname.split(".").pop();
  var issues_with = req.body['issues_with'];
  console.log(issues_with);
  // var filenames = name[0].filename; //accessing first member of json array
  // filenames=filenames+'.'+ext;
  var filenames = name[0].filename;
  var detail = req.body.comment;
  var roomno = req.session.user;
  var issues = issues_with;
  // var check = name[0].originalname;
  // console.log("lol" + check);
  var rm = req.session.user;
  db.get("complaint_detail_students")
    .push({ roomno: roomno, detail: detail, imgurl: filenames,issues: issues })
    .write();
  return res.redirect("/cp2");

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

app.get("/cp", (req, res) => {
  res.sendFile(path.join(__dirname, "/cp.html"));
});


//USER COMPLAINT DISPLAY
app.get("/cp2", (req, res) => {
  var b = req.session.user;
  var a = db.get("complaint_detail_students").value();
  var l = []
  
  db.get("complaint_detail_students").value().forEach(element => {
		
    if (element.roomno == b) {
      // var details = (db.get('complaint_details_students').find().value().detail);
      // console.log(details);

      l.push(element)
      // console.log(l);
    }
  });
  // console.log("outside lopp"+ l);
  // console.log("data of session user" +	c);
  console.log("inside cp2" + req.session.user);
  // console.log('a', a);
  res.render("cp2.pug", { a: a, title: "success", b: b,l:l});
  return l;
});

// ADMIN PORTAL
app.get("/cp3", (req, res) => {
  var b = req.session.user;
  var a = db.get("complaint_detail_students").value();
  // console.log("outside lopp"+ l);
  // console.log("data of session user" +	c);
  console.log("inside cp2" + req.session.user);
  // console.log('a', a);
  res.render("cp3.pug", { a: a, title: "success", b: b});
  return a;
});
app.get("/cp1", (req, res) => {
  res.sendFile(path.join(__dirname, "/cp1.html"));
});

app.listen(8000, () => {
  console.log("Example app listening on port 8000!");
});

//console.log(db.get('users').find({'roomno' : '1'}).value())
