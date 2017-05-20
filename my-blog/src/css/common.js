import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "header": {},
    "content_center": {
        "textAlign": "center"
    },
    "header_title": {
        "fontSize": 40,
        "display": "inline-block"
    },
    "header_setting": {},
    "loginInputForm": {
        "width": 400,
        "marginTop": "auto",
        "marginRight": "auto",
        "marginBottom": "auto",
        "marginLeft": "auto"
    },
    "form-group": {
        "marginBottom": 30
    },
    "flash_message": {
        "marginTop": "auto",
        "marginRight": "auto",
        "marginBottom": 30,
        "marginLeft": "auto",
        "paddingTop": 6,
        "paddingRight": 10,
        "paddingBottom": 6,
        "paddingLeft": 10,
        "border": "1px solid rgb(210, 204, 207)",
        "borderRadius": 5,
        "width": 400
    },
    "nav_action": {
        "paddingRight": 30
    },
    "container": {
        "width": 800,
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto"
    },
    "clearfix:after": {
        "display": "block",
        "content": "clear",
        "height": 0,
        "clear": "both",
        "overflow": "hidden",
        "visibility": "hidden"
    },
    "no-match-container": {
        "textAlign": "center",
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto"
    }
});