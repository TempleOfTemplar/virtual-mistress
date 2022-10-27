const fs = require("fs");
const renderSvg = require("lottie-to-svg");

const animationData = JSON.parse(fs.readFileSync(`Heart/bookmark.json`, "utf8"));

renderSvg(animationData, {autoplay: true}).then(svg => {
    fs.writeFileSync(`Heart/myanim.svg`, svg, "utf8");
});
