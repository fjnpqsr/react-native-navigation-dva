# Intro

react-native + dva-core + react-navigation + sass project base

# Install

> `npm install`

if stuck at `node-scss`, try `npm rebuild node-sass` to rebuild node-sass

tips: use `yarn` install dependencies may stuck at install `node-sass`, suggest use `npm` to install dependencies

----
# tools

 - yellowBox is closed default, config `~/index.js` to open it

 ```js
  console.disableYellowBox = true // -
  console.disableYellowBox = false // +
```

----
# project config support 

modify `~/app.json` to change the default configs for app

- `statusBar`: default statusBar props
    - animated
    - barStyle
    - hidden
    - backgroundColor
    - translucent
    - networkActivityIndicatorVisible
    - showHideTransition
    
   look at [React-Native StatusBar](https://facebook.github.io/react-native/docs/statusbar#translucent),
   suggest use `translucent:true` then the statusBar in both android and IOS has same behavior
   
- `pageColor`: `Page` component default backgroundColor, you can overwrite it in route, like:
    ```
        const SomePage = () => {
            return <Page style={{backgroundColor: 'red'}}>
        }
        export default SomePage
    ```
- `iosStatusBarHeight`: config `StatusBar` height for IOS, in Android , this value calc with device 


----
# global
### models/app

| props | desc | type | value |
|--- |--- |--- |--- |
| state | status of app | `String` | `active`, `background`, `inactive` |

### utils

- [`getPermission(permission, succeed, denied)`]()

----
# Components
