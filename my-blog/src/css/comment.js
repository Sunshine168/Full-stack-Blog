import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "comment_detail": {
        "marginLeft": 20,
        "display": "inline-block",
        "verticalAlign": "top"
    },
    "comment_detail h5": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "comment_detail span": {
        "color": "#999",
        "marginLeft": 10
    },
    "comment_container": {
        "width": 600,
        "marginTop": 0,
        "marginRight": "auto",
        "marginBottom": 0,
        "marginLeft": "auto"
    },
    "comment_control": {
        "display": "inline-block",
        "float": "right"
    },
    "comment_wrap": {}
});