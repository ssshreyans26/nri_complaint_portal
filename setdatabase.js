const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync')


const adapter = new FileSync('database.json')
const db = low(adapter)

db.defaults({users:[],unum:0}).write()
db.defaults({complaint_detail_students:[],unum:0}).write()
// Add a post
db.get('users')
  .push({ 'roomno': '1', 'password' : '1ds17'})
  .write()
db.get('users')
.push({ 'roomno' : '2', 'password' : '1ds171'})
.write()

db.get('complaint_detail_students')
  .push({'roomno':'',
         'detail':'',
         'imgurl':'',  })
         .write();