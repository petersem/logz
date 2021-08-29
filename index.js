// index.js
const express = require('express');
const app = express();
const fs = require('fs');
const cors = require("cors");
const pjson = require("./package.json");
const ver = require("./versions");

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

// async function getAppDetails(){
//   let v = new ver();
//   let x = await v.GetApps('posterr');
//   let appObj = JSON.parse(x);
//   console.log('-->' + x + '<--');
// }

//getAppDetails();

app.post("/pstr", (req,res) => {
  let payload = "";
  Object.keys(req.body).forEach(key => {
    payload += "," + key + ":" + req.body[key]
  });
  payload = payload.substring(1);
  res.send(`{"version":"1.13.0","message":""}`);
//  res.send(`{"version":"1.10.1","message":"Did you know that clicking on the poster, or the title, will take you to settings?"}`);
  let d = new Date();
  d.getDate();
  let now = d.toLocaleString();
  console.log("Posterr heartbeat: " + payload);
  payload = now + "," + payload + "\n"
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

