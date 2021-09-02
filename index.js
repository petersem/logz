// index.js
const express = require('express');
const app = express();
const fs = require('fs');
const cors = require("cors");
const pjson = require("./package.json");
const ver = require("./versions");
const setng = require("./settings");

console.log("-------------------------------------------------------");
console.log(" Logz - A very basic app metrics logger");
console.log(" Developed by Matt Petersen - Brisbane Australia");
console.log(" ");
console.log(" Version: " + pjson.version);
console.log(" ");
console.log("-------------------------------------------------------");

const settings = loader();
console.log(settings.apps);
// ls.apps.forEach((app) =>{
//   console.log('-->' + app.appName);

// })

function loader(){
  let stng = new setng();
  let conf = stng.GetSettings()
  return conf;
}

// Express settings
app.use(express.json());
app.set("trust proxy", true);
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(cors());

settings.apps.forEach((myApp) => {
  app.post(myApp.endPoint, (req,res) => {
    let payload = "";
    Object.keys(req.body).forEach(key => {
      payload += "," + key + ":" + req.body[key]
    });
    payload = payload.substring(1);
    res.send(`{"version":"` + myApp.version + `","message":"` + myApp.message + `"}`);

    let d = new Date();
    d.getDate();
    let now = d;
    console.log(myApp.appName + " heartbeat: " + payload);
    payload = now + "," + payload + "\n"
    fs.appendFile('./logs/' + myApp.logFile, payload , function (err) {
        if (err) throw err;
      });
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

