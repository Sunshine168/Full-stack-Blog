import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "message_detail": {
        "marginLeft": 20,
        "display": "inline-block",
        "verticalAlign": "top"
    },
    "message_detail h5": {
        "marginTop": 0,
        "marginRight": 0,
        "marginBottom": 0,
        "marginLeft": 0
    },
    "message_detail span": {
        "color": "#999",
        "marginLeft": 10
    }
});