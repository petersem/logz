// index.js
const express = require('express');
const app = express();
const fs = require('fs');
const cors = require("cors");

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
    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    if(ip.includes(":")) ip = "localhost";
    let version = req.body.version;
    let nsEnabled = req.body.nsEnabled;
    let odEnabled = req.body.odEnabled;
    let sEnabled = req.body.sEnabled;
    let rEnabled = req.body.rEnabled;
    let pEnabled = req.body.pEnabled;
    res.sendStatus(200);
    let d = new Date();
    d.getDate();
    let now = d.toISOString();
    let payload = now + "," + ip + "," + version + "," + nsEnabled + "," + odEnabled + "," + sEnabled + "," + rEnabled + "," + pEnabled + "\n"
    fs.appendFile('./logs/posterr.txt', payload , function (err) {
        if (err) throw err;
      });
});

app.get("/test", (req,res) => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    res.write("Your IP is:",ip);
    res.write("Functioning ok");
    res.sendStatus(200);

    fs.appendFile('posterr.txt', payload , function (err) {
        if (err) throw err;
      });
});


// start listening on port 3000
app.listen(3001, () => {
    console.log(`✅ Web server started on internal port 3001 `);
});

