var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./Models");

var port = process.env.PORT ||  3000;

var app = express();

app.use(logger("dev"));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

mongoose.Promise = Promise;
mongoose.connect("mongodb://localhost/streamPopulater");

// Routes
// GET route for scraping 
app.get("/scrape", function(req, res) {
    axios.get("https://www.reddit.com/r/nbastreams/").then(function(response) {
    var $ = cheerio.load(response.data);
    
    $("p.title").each(function(i, element) {
        var result = {};
        
        result.title = $(this).children("a").text();
        result.link = $(this).children("a").attr("href");

        
        db.Streams.create(result)
        .then(function(dbStreams) {
            console.log(dbStreams);
        })
        .catch(function(err) {
            return res.json(err);
        });
    });
    
    res.send("Scrape Complete");
});
});

app.get("/streams", function(req, res) {
    db.Streams.find({})
    .then(function(dbStreams) {
        res.json(dbStreams);
    })
    .catch(function(err) {
        res.json(err);
    });
});

app.get("/streams/:id", function(req, res) {
    db.Streams.findOne({ _id: req.params.id })
    .populate("note")
    .then(function(dbStreams) {
        res.json(dbStreams);
    })
    .catch(function(err) {
        res.json(err);
    });
});

app.post("/streams/:id"), function(req, res) {
    db.Note(create(req.body)
    .then(function(dbNote) {
        return db.Streams.findOneAndUpdate({ _id: req.params.id }, { note: dbNOte._id }, { new: true });
    })
    .then(function(dbStreams) {
        res.json(dbStreams);
    })
    .catch(function(err) {
        res.json(err);
    }));
};

app.listen(port, function() {
    console.log("App running on port " + port + "!");
});