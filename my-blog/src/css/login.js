import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "header": {
        "textAlign": "center",
        "display": "inline-block"
    },
    "content_center": {
        "width": "0 auto"
    },
    "previewAvater": {
        "height": 100,
        "width": 100
    }
});