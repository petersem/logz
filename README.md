# logz
Basic logging tool, similar to a syslog-style app. Takes any parameters in a HTTP post, and retruns current app version number and optional message. Writes whatever is posted, to a log file

Create a settings.json file in /config and configure for your apps similar to this example. 

```
{
    "apps": [
        {
            "appName": "posterr",
            "endPoint": "/pstr",
            "logFile" : "posterr.log",
            "version": "1.14.0",
            "message": "Join the Posterr Discord channel to get updates and limited support. https://discord.gg/x9JEwChs47"
        },
        {
            "appName": "monocker",
            "endPoint": "/monocker",
            "logFile" : "monocker.log",
            "version": "2.5.0",
            "message": "This is a test monocker message"
        }
    ]
}
```
