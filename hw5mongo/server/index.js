const express = require('express');
const bodyParser = require('body-parser');

const mongoose = require('mongoose')
const url = 'mongodb://127.0.0.1:27017/hw5db' // change this as needed

mongoose.connect(url, { useNewUrlParser: true })

const db = mongoose.connection
db.once('open', _ => {
  console.log('Database connected:', url)
})

db.on('error', err => {
  console.error('connection error:', err)
})

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;

var router = express.Router();

// SCHEMA
const item = mongoose.Schema({
    image_url: String,
    date: String,
})

const APOD = mongoose.model("APOD", item);

// The method of the root url. Be friendly and welcome our user :)
router.get('/', function(req, res) {
    res.json({ message: 'Welcome to the APOD app.' });   
});

// create an APOD and put it in the database
router.post("/db", (req, res) => {
  const apod = new APOD({
    image_url: req.body.image_url,
    date: req.body.date,
  })
  apod.save((error, document) => {
    if (error) {
      res.json({status: "failure"})
    } else {
      res.json({
        status: "success",
        id: apod._id,
        content: req.body,
      })
    }
  })
});

// get all APODs in the database
router.get("/db/all", (req, res) => {
  APOD.find().then((apods) => {
    res.json({ message: "return all apods", apods: apods});
  })
});

// Combine endpoints into a single route - by id
router.route("/db/:id")
  // retrieve apod by id
  .get((req, res) => {
    APOD.findById(req.params.id, (error, apod) => {
      if (error) {
        res.status(500).json({ status: "failure" })
      } else {
        res.json(apod)
      }
    })
  })
  // delete apod by id
  .delete((req, res) => {
		APOD.findByIdAndDelete(req.params.id, (error, apod) => {
			if (error) {
				res.status(500).json({ status: "failure" })
			} else {
				res.json(apod)
			}
    })
	})


// SERVER SETUP

app.use('/api', router); // API Root url at: http://localhost:8080/api
app.use(express.static('../client'));

app.listen(port);
console.log('Server listenning on port ' + port);