## Demo


## Credentails

**[settings/config.json](./settings/config.json)**

```js

{
    "token":"xxx", // webex-bot token, make one: https://developer.webex.com/my-apps/new
    "apiKey":"__REPLACE__ME", // Voiceflow project api key
    "port":8000, // Port used by /server/index.js
    "host":"localhost" // deployed hotname of server/index.js (in case applications want to call into it directly)
    
}
```

## Quickstart

```
npm run setup
npm run boot:server # mysterious "black-box" backend
npm run boot:ui # custom videogame'y ui
npm run boot:webex-bot # native webex clients
npm run boot:webex-web # static html w/ webex widget embed
```



## Setup deps

```
npm run setup
```


## Server

```
npm run boot:server
```

## WebEx Bot

1. File upload (xlsx to html?)
2. Take photo from iPhone app

```
cd webex-bot
npm i
npm run dev
```

## WebEx WebUI

```
npm run boot:webex-web
```

## use-cases

1. show the diagram, sass ui integration, call into 3rd-party service w/ api block, then add urgent emergency item to initial selection screen from vf
2. video-game'y ui: same "business" process but different web interface
3. native desktop webex, upload a spreadsheet & do something w/ it, rich components (https://developer.webex.com/docs/api/guides/cards)
4. webex mobile application, take a photo of router and get device data (use in-house bot handler then pass off to vf)
5. Webex "user-handoff": open webex-web, find the user and then send them a message (only thing the support person needs is a bot token)
6. extra: audio phone alert, gpt3 tone "smoother", etc

- images/files are secure, stay in corp infrastructure
- "responsive" to take maxiumum advantage of platforms ui + sensing capabilities
- multi-cloud

why
- multicloud, glue together services
- not asking for perfect infrastructure or process or sunny day in the future where everything is figured out
- We're bolting on new/previously impossible functionality 

## Server

```
cd server
npm i
node index.js
```

## Frontend (cartoon'y)

```
npm i
npm run serve
# npm run build # bundle, put into server/ui
```

## WebEx web embed

```

```