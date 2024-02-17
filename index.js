import express from "express";
import mysql from "mysql";
import dotenv from "dotenv";
dotenv.config();

const env = {
  HOST: process.env.HOST,
  USERNAME: process.env.USERNAME,
  DATABASE: process.env.DATABASE,
  PASSWORD: process.env.PASSWORD,
  PORT: process.env.PORT
};

let pool = mysql.createPool({
  host     : "yh6.h.filess.io",
  user     : "automation_heraction",
  password : "a15e5a47817c45a99ca9f32298e1cca90ea3c056",
  database : "automation_heraction",
  port     : 3306
});

const app = express();
app.use(express.json());

app.get('/users', (req,res)=>{
  pool.getConnection(function(err,connection){
  connection.query(
    'SELECT * from users_davydova',
     function (error, results, fields) {
    connection.release();
    if (error) throw error;
    res.json(results);
  });
  });
});


app.get('/users/:id', (req,res)=>{
  const {id} = req.params;

  pool.getConnection(function(err,connection){
  connection.query(
    `SELECT * from users_davydova WHERE id=${id}`,
     function (error, results, fields) {
     if (error) throw error;
     console.log(results);
     res.json(results);
  });
});
});

// app.get('/users/:username', (req,res)=>{
//  const { username } = req.params;
//  pool.getConnection(function(err,connection){
//  connection.query(
//     `SELECT * FROM users_davydova WHERE username =${username}`,
//      function (error, results, fields) {
//      if (error) throw error;
//      console.log(results);
//      res.json(results);
//   });
//  });
// });

app.post('/user', (req,res)=>{
  const {username,email,password} = req.body;
  pool.getConnection(function(err,connection){
  connection.query(
    `INSERT INTO users_davydova (username,email,password) VALUES ('${username}','${email}','${password}')`, 
    function (error, results, fields) {
    if (error) throw error;
    console.log(results);
  });
 });
});


app.delete('/user/:id', (req,res)=>{
  const {id} = req.params;
  pool.getConnection(function(err,connection){
  connection.query(
    `DELETE from users_davydova WHERE id=${id}`,
     function (error, results, fields) {
    if (error) throw error;
    console.log(results);
    res.json(results);
  });
 });
});


app.put("/user/:id", (req, res) => {
  // const { username, email, password } = req.body;
  // const { id } = req.params;

  pool.getConnection(function(err, connection) {
    if (err) {
      console.error('Error connecting to database:', err);
      res.status(500).json({ error: 'Failed to connect to database' });
      return;
    }
    connection.query(
      `UPDATE users_davydova SET username = "Flower", email = "flowers@gmail.com", password = 111111 WHERE id = 4`,
      function(error, results, fields) {
      connection.release();
        if (error) {
          console.error('Error updating user:', error);
          res.status(500).json({ error: 'Error updating user' });
          return;
        }
          console.log(results);
          res.json(results);
      }
    );
  });
});


app.listen(env.PORT,()=>{
  console.log('Listening on port 3000');
});