const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const router = require("./app");

const server = express();
server.use(cors());
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: true }));
server.use("/api", router);

server.all("*", (req, res) => {
    res.json({ message: "tidak ada layanan" });
});

server.listen(3030, err => {
    if (err) throw new Error();
    console.log("Server start on port 3030");
});
