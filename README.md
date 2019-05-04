# Intro

react-native + dva-core + react-navigation + sass project base


# tools

 - yellowBox is closed default, config `~/index.js` to open it

 ```js
  console.disableYellowBox = true // -
  console.disableYellowBox = false // +
```

# Install

> `npm install`

if stuck at `node-scss`, try `npm rebuild node-sass` to rebuild node-sass

tips: use `yarn` install dependencies may stuck at install `node-sass`, suggest use `npm` to install dependencies



----
# global
### models/app

| props | desc | type | value |
| --- | --- | --- |
| state | status of app | `String` | `active`, `background`, `inactive` |

### utils

- [`getPermission(permission, succeed, denied)`]()

----
# Components
