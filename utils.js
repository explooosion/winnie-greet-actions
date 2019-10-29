module.exports.getRandomImage = () => {
    const random = Math.floor(Math.random(3) + 1);
    return `https://raw.githubusercontent.com/explooosion/winnie-greet-actions/master/assets/${random}.png`
}