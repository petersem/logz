const fs = require("fs");
const fsp = require("fs").promises;

/**
 * @desc settings object is used to get and set all settings for poster
 * @returns {<object>} settings
 */
class Settings {
  constructor() {
    // default values
    this.apps = [{"appName": "", "version":"", "message":""}];
    return;
  }

  /**
   * @desc Gets all Poster settings
   * @returns {<object>} json - json object for all settings
   */
  GetSettings() {
    const data = fs.readFileSync("config/settings.json", "utf-8");
    let readSettings;
    try {
      readSettings = JSON.parse(data.toString());
      //console.log(readSettings);
      Object.assign(this, readSettings);
      return this;
    } catch (ex) {
      // do nothing if error as it reads ok anyhow
      let d = new Date();
      console.log(d.toLocaleString() + " *Failed to load settings - GetSettings:", ex);
    }

    // populate settings object with settings from json file



    // ensure settings loaded before returning
    // return new Promise((resolve) => {
    //   setTimeout(function () {
    //     resolve(readSettings);
    //   }, 2000);
    // });
  }


}

module.exports = Settings;
