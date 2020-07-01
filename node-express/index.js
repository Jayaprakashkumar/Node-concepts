const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const app = express();
const port = 3000;
const hostName = "localhost";

// log the server activities
app.use(morgan("dev"));
app.use(bodyParser.json());

//serve the static html page
app.use(express.static(__dirname + "/public"));

app.all("/dishes", (req, res, next) => {
    req.statusCode = 200;
    res.setHeader("Content-Type", "text/plain");
    next();
});

app.get("/dishes", (req, res, next) => {
    res.end(`Send all the dishes`);
});

app.post("/dishes", (req, res, next) => {
    // res.end(
    //     `post all the dishes with  name ${req.body.name} with details ${req.body.description}`
    // );
    res.end(
        "post all the dishes with name " +
        req.body.name +
        " and details " +
        req.body.description
    );
});

app.put("/dishes", (req, res, next) => {
    res.statusCode = 403;
    res.end("It wil not update any dishes");
});

app.delete("/dishes", (req, res, next) => {
    res.end("Delete all the dishes!!");
});

app.get("/dishes/dishId", (req, res, next) => {
    // res.end(`Send the details of dish id ${req.params.dishId} `);
    res.end("Send the details of dish of Id " + req.params.dishId);
});

app.post("/dishes/dishId", (req, res, next) => {
    res.statusCode = 403;
    res.end("Post will not work for unique Id " + req.params.dishId);
});

app.put("/dishes/dishId", (req, res, next) => {
    res.write("Update the dish for particular id " + req.params.dishId + "\n");
    res.end(
        `Update the dish values with name ${req.body.name} and details ${req.body.description}`
    );
});

app.delete("/dishes/dishId", (req, res, next) => {
    res.end(`Delete the dishes for ${req.params.dishId}!!`);
});

app.use((req, res, next) => {
    console.log(req.headers);
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.end("<html><body><h1>This is express server</h1></body></html>");
});
const server = http.createServer(app);

server.listen(port, hostName, () => {
    console.log(`The server runs at port localhost://${hostName}:${port}`);
});