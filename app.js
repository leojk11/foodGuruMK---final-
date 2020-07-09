const express = require('express');
const session = require('express-session');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
// const phpnode = require('node-php')
require('dotenv/config');
const mainRouter = require('./main-router/router');
const publicRoutes = require('./routes');
// const desktopRouter = require('./public/desktopadmin/routes/routes');
// const session = require('express-session');
const middlewares = require('./middlewares/middlewares')
const socket = require('socket.io');
// const nodemailer = require('nodemailer');
const domainName = 'http://localhost:3000';

const app = express();
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}));
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload());

app.get(express.static(__dirname + "/public"));

  app.post('/categoriesImage', (req, res) => {
    if(req.files){
      var file = req.files.fileToUpload,
        filename = file.name;
        console.log(file);
  
        file.mv('./images/categories/' + filename, function(error){
          if(error){
            console.log(error);
            res.json({ message: 'error occured' })
          } else {
          //   res.json({ message: 'Done!' });
             res.redirect(domainName + '/superadmin/manage-categories')
          }
        })
    } else {
      res.redirect(domainName + '/superadmin/manage-categories');
    }
  })
  app.post('/carrierImage', (req, res) => {
    if(req.files){
      var file = req.files.fileToUpload,
        filename = file.name;
  
        file.mv('./images/carriers/' + filename, function(error){
          if(error){
            console.log(error);
            res.json({ message: 'error occured' })
          } else {
          //   res.json({ message: 'Done!' });
            res.redirect(domainName + '/superadmin/manage-carriers')
          }
        })
    } else {
      res.redirect(domainName + '/superadmin/manage-carriers');
    }
  })



app.post("/addMealImg", function(req, res) {
    if(req.files){
        var file = req.files.fileToUpload,
        filename = file.name;

        file.mv('./images/meals/' + filename, function(error){
            if(error){
                console.log(error);
                res.json({ message: 'error occured' })
            } else {
            //   res.json({ message: 'Done!' });
                res.redirect(domainName + '/superadmin/manage-meals');
            }
        })
    } else {
      res.redirect(domainName + '/superadmin/manage-meals');
    }
})
app.post("/restaurantsImage", function(req, res) {
    if(req.files){
        var file = req.files.fileToUpload,
        filename = file.name;

        file.mv('./images/restaurants/' + filename, function(error){
            if(error){
                console.log(error);
                res.json({ message: 'error occured' })
            } else {
            //   res.json({ message: 'Done!' });
                res.redirect(domainName + '/superadmin/manage-restaurants')
            }
        })
    } else {
      res.redirect(domainName + '/superadmin/manage-restaurants');
    }
})

app.use(mainRouter);
app.use(publicRoutes);

const port = process.env.PORT || 5000;
// const hostname = '199.188.204.226';
const server = app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});

//socket io server connection
const io = socket(server)

io.on('connection', socket =>{

  socket.on('joinOrder', (restaurantName) => {
    console.log(restaurantName)
    socket.join(restaurantName)
  })
  socket.on('order', restName =>{
    restName.forEach(restName => {
      socket.join(restName)
      io.to(restName).emit('message', 'msg')
    });
    
  })
})

module.exports ={
  io
}