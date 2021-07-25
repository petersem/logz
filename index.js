// index.js
const express = require('express');
const app = express();
const fs = require('fs');
const cors = require("cors");
const pjson = require("./package.json");


console.log("-------------------------------------------------------");
console.log(" Logz - A very basic app metrics logger");
console.log(" Developed by Matt Petersen - Brisbane Australia");
console.log(" ");
console.log(" Version: " + pjson.version);
console.log(" ");
console.log("-------------------------------------------------------");

// Express settings
app.use(express.json());
app.set("trust proxy", true);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());

app.post("/pstr", (req,res) => {
    let version = req.body.version;
    let nsEnabled = req.body.nsEnabled;
    let odEnabled = req.body.odEnabled;
    let sEnabled = req.body.sEnabled;
    let rEnabled = req.body.rEnabled;
    let pEnabled = req.body.pEnabled;
    let uuid = req.body.uuid;
    res.sendStatus(200);
    let d = new Date();
    d.getDate();
    let now = d.toISOString();
    console.log("Posterr heartbeat from: " + uuid + " (version " + version + ")");
    let payload = now + "," + uuid + "," + version + "," + nsEnabled + "," + odEnabled + "," + sEnabled + "," + rEnabled + "," + pEnabled + "\n"
    fs.appendFile('./logs/posterr.txt', payload , function (err) {
        if (err) throw err;
      });
});

app.get("/test", (req,res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end("Your UUID is: " + uuid + "\nLogz is functioning ok\n");
});


// start listening on port 3000
app.listen(3001, () => {
    console.log(`✅ Web server started on internal port 3001 `);
});

