# Frontend
![screenshot](https://github.com/FiedlerInformatics/phishing-study/blob/main/frontend/src/assets/screenshot.png?raw=true)

# Structure
Emails are stored in `./frontend/src/lib/emails.json` with the following structure:
```
{
    "id": <integer>,
    "sender": <string>,
    "subject" <string>,
    "timestamp": <string>,
    "preview": <string>, 
    "body": <string>,
    "folder": <string>,
    "isPhishing": <true/false>,
    "read": <true/false>
  },
```
