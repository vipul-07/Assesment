const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const multer = require("multer");
const path = require('path');
const routes = require('./routes/routes');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb://localhost:27017/";
const csv=require('csvtojson');
var collection;
var database;


/* File Storage */
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      console.log(file);
      cb(null, file.originalname);
    },
  });
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(multer({ storage: storage }).single('csvFile'));



  /* Reading data from the file and Storing it into the Database*/
  const csvFilePath = './uploads/data.csv';
  csv()
  .fromFile(csvFilePath)
  .then((jsonObj)=>{
  console.log(jsonObj);
  MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true  }, (error, client) => {
    if (error) {
      throw error;
    }
   database = client.db("demo");
   collection = database.collection("csvfile");
   collection.insertMany(jsonObj, (err, res) => {
    if (err) {
    throw err;
    }
    console.log("Number of documents inserted: " + res.insertedCount);
    });
  });
})


/* GET API to fetch the uploaded data */
app.get('/api/data', (req, res) => {
  collection.find({}).toArray((error, result) => {
            if(error) {
                return response.status(500).send(error);
            }
            res.send(result);
        });
 });



/* POST route import to upload a file to the server */
app.use('/api', routes);


/** creating a server */
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})































