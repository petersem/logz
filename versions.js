const fs = require("fs");
const fsp = require("fs").promises;

let app = { appName: "", version: 0, message: "" }

/**
 * @desc settings object is used to get and set all settings for poster
 * @returns {<object>} settings
 */
class versions {
    constructor() {
        // default values
        this.appName;
        this.version;
        this.message;
    }

    /**
     * @desc Gets all Poster settings
     * @returns {<object>} json - json object for all settings
     */
    async GetApps(application) {
        // check if file exists before downloading
        if (!fs.existsSync("apps.json")) {
            //file not present, so create it with defaults
            //await this.SaveSettings();
            console.log("✅ Apps.json file created");
        }
console.log('--->' + application);
        const data = fs.readFileSync("apps.json", "utf-8");

        let readApps;
        try {
            readApps = await JSON.parse(data.toString());
            //console.log(readApps);
            await readApps.forEach(a => {
                if(a.appName.toLowercase == application) {
                    console.log('-->' + a.message)
                    this.appName = a.appName;
                    this.version = a.version;
                    this.message = a.message;
                    console.log(this);
                }
            });

        } catch (ex) {
            // do nothing if error as it reads ok anyhow
            let d = new Date();
            console.log(d.toISOString + " *Failed to load settings - GetSettings:", ex);
        }

        // ensure settings loaded before returning
        return await new Promise((resolve) => {
            setTimeout(function () {
                resolve(this);
            }, 2000);
        });
    }


    async GetApp(appName){
        let apps = await this.GetApp();
        let app;
        apps.forEach(a => {
            if(a.appName == appName) app = a;
        });
    }
}

module.exports = versions;