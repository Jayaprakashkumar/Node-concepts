const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");

const dishRouter = require("./router/dishRouter");
const promoRouter = require("./router/promoRouter");
const leaderRouter = require("./router/leaderRouter");
const { Router } = require("express");

const app = express();
const port = 3000;
const hostName = "localhost";

// log the server activities
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use("/dishes", dishRouter);
app.use("/promotions", promoRouter);
app.use("/leaders", leaderRouter);

//serve the static html page
app.use(express.static(__dirname + "/public"));

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