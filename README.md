## Demo


## 1) Credentials


Set credentails in **[settings/config.json](./settings/config.json)**

```js

{
    "token":"xxx", // webex-bot token, make one: https://developer.webex.com/my-apps/new
    "apiKey":"__REPLACE__ME", // Voiceflow project api key
    "port":8000, // Port used by /server/index.js
    "host":"localhost" // deployed hostname of backend/index.js
}
```


## 2) Install dependencies
```
npm run setup # dependencies
```

## [background] 3) Boot "backend"


Defaults port 8000

```
npm run boot:backend
```

## [background] 4) Boot bot

Defaults to websockets

```
npm run boot:webex-bot
```


## 5) Boot custom ui

Defaults localhost:8080

```
npm run boot:ui # custom videogame'y ui
```

## 6) Boot sassy-ui

```
npm run boot:sass
```

## 7) Boot WebEx (web)

```
npm run boot:webex-web
```


```
npm run boot:backend # mysterious "black-box" backend
npm run boot:ui # custom videogame'y ui
npm run boot:webex-bot # native webex clients
npm run boot:webex-web # static html w/ webex widget embed
```



## "Backend"

Mysterious blackbox service returns Google Assistant v2 JSON spec

**[DialogFlow Payloads](https://gist.github.com/valgaze/dcd07f6d93f654de6d14d76a341d9450)**


Deploy to serverless w/

```
npm run deploy:backend
```

## WebEx Bot

1. File upload (xlsx to html?)
2. Take photo from iPhone app


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

## Broken

- (low priority) serve all built/static from backend/ui (fallback is just serve live-reloaded)
