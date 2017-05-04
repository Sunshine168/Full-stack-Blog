import React, {StyleSheet, Dimensions, PixelRatio} from "react-native";
const {width, height, scale} = Dimensions.get("window"),
    vw = width / 100,
    vh = height / 100,
    vmin = Math.min(vw, vh),
    vmax = Math.max(vw, vh);

export default StyleSheet.create({
    "article_title": {
        "fontSize": 24
    },
    "ariticle_foot a": {
        "color": "#999",
        "textDecoration": "none",
        "fontSize": 18
    },
    "ariticle_foot a:visited": {
        "color": "#999"
    }
});