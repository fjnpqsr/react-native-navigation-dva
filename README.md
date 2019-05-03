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

tips: use `yarn` install dependencies may stuck at install node-sass, suggest use npm to install dependencies


# models/app

> STATE

status of app

- `active`
- `background `
- `inactive`

# global

### utils

> getPermission(permission, succeed, denied)

> 
