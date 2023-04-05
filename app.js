const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const data = require("./data.json");

const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use("/static", express.static("public"));
app.set("view engine", "pug");

app.get('/', (req, res) => {
    res.render('index', data);
})

app.get('/about', (req, res) => {
    res.render('about', data);
})

app.get('/projects/:id', (req, res) => {
    const id = req.params.id;
    res.render('project', { data, id: req.params.id } );
})

app.use((req, res, next) => {
    const err = new Error("This page does not exist");
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.status(err.status || 500);
    if (err.status === 404) {
        res.render("page-not-found", {err});
        console.log("Sorry, this page does not exist");
    } else {
        res.render("error", {err});
        console.log("Sorry, this page does not exist");
    }
});

app.listen(3000, () => {
    console.log("App is running on local:3000");
});
