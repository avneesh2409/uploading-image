//var express = require('express');
var formidable = require('formidable');
var fs = require('fs');
var http = require('http')
const User = require('./models/model')
//const app=express()


var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      if (err) { throw (err) }
      console.log(fields)
      console.log(files.filetoupload.name)
      //       User.findAll({
      //         where: {number: fields.number},
      //       }).then((user)=>{
      //  console.log(user)
      //       })
      var oldpath = files.filetoupload.path;
      var newpath = 'C:/Users/avndv/Desktop/NodeJs/uploads/' + Math.floor(Math.random() * 1000) + "_" + files.filetoupload.name;
      let data = {
        number: fields.number,
        token: fields.token,
        image_uploaded: newpath
      }
      User.create(data).then(jane => {
        console.log("auto-generated ID:" + jane.id);
      });
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
      });

      res.write("successfully registered")
      res.end()
    });
  }
  if (req.url == '/get/api') {
    User.findAll().then(users => {
      console.log("All users:")
      res.write("<table border='1' style='border-collapse:collapse'><tr><th>id</th><th>number</th><th>token</th><th>image</th><th>createdAt</th><th>updatedAt</th></tr>")
      users.map(e => {
        console.log(e.dataValues)
        res.write("<tr><td>" + e.dataValues['id'] + "</td><td>" + e.dataValues['number'] + "</td><td>" + e.dataValues['token'] + "</td><td>" + e.dataValues['image_uploaded'] + "</td><td>" + e.dataValues['createdAt'] + "</td><td>" + e.dataValues['updatedAt'] + "</td></tr>")
      })
      res.write("</table>")
      res.end()
    })

  }
  if (req.url == '/register') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<h1>Register Here</h1><p><input type="text" placeholder="enter the username" name="number" /></p><p><input type="password" name="token" placeholder="enter the password" /></p>')
    res.write('<p><input type="file" name="filetoupload"></p>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
  if (req.url == '/dashboard') {
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      console.log(fields)
      User.findAll({
        where: {
          number: fields.username,
          token:fields.password
        }
      }).then(user=>{
        user.map((e)=>{
          console.log(e.dataValues.image_uploaded)
        })
      })

    })
    fs.readFile('./views/index.html', null, function (error, data) {
      if (error) {
        res.writeHead(404);
        res.write('Whoops! File not found!');
      } else {
        res.write(data);
      }
      res.end();
    });
  }
  if (req.url == '/loginform') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<form action="dashboard" method="post"><div><h1>Login Here</h1><p><input type="text" placeholder="enter the username" name="username" /></p><p><input type="password" name="password" placeholder="enter the password"  /></p></div><input type="submit" value="Log In"></form>')
  }

}).listen(5000, () => {
  console.log("running on 5000")
});


// app.post('/',(req,res)=>{
//    var form = new formidable.IncomingForm();
//     form.parse(req,(err, fields, files)=> {
//       console.log(fields)
//       var oldpath = files.filetoupload.path;
//       var newpath = 'C:/Users/avndv/Desktop/NodeJs/uploads/'+ Math.floor(Math.random()*1000)+"_"+ files.filetoupload.name;
//       fs.rename(oldpath, newpath, function (err) {
//         if (err) throw err;
//         res.status(200).json({
//           fields,
//           message:"File uploaded"
//         })
//       });

//     })
// })
//  app.get('/',(req,res)=>{
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
//   res.write('<input type="file" name="filetoupload"><br>');
//   res.write('<input type="submit">');
//   res.write('</form>');
//   return res.end();
//  }) 
// app.listen(5000,()=>{
//   console.log("server is running on 5000")
// })