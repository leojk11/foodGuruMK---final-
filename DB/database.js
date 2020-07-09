var mysql = require('mysql');
require('dotenv/config');

// var con = mysql.createConnection({
//   host     : "199.188.204.226",
//   user     : "foodguru_leo",
//   password : "JcLZF~Qap35[",
//   database : "foodguru_mainFoodGuruDb"
// });

var con = mysql.createConnection({
    host     : process.env.HOST,
    user     : process.env.USER,
    password : process.env.PASSWORD,
    database : process.env.DATABASE,
    timezone: "Macedonia/Skopje"
  });

con.connect((error) => {
    if(error) {
        console.log(error);
    } else {
        console.log('DB CONNECTED!')
    }
});

// module.exports = {
//     query: function(){
//         var sql_args = [];
//         var args = [];
//         for(var i=0; i<arguments.length; i++){
//             args.push(arguments[i]);
//         }
//         var callback = args[args.length-1]; //last arg is callback
//         con.getConnection(function(err, connection) {
//         if(err) {
//                 console.log(err);
//                 return callback(err);
//             }
//             if(args.length > 2){
//                 sql_args = args[1];
//             }
//         connection.query(args[0], sql_args, function(err, results) {
//           connection.release(); // always put connection back in pool after last query
//           if(err){
//                     console.log(err);
//                     return callback(err);
//                 }
//           callback(null, results);
//         });
//       });
//     }
// };
module.exports = con;