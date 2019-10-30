module.exports.getRandomImage = () => {
  const random = Math.floor(Math.random() * 10) + 1;
  return `https://raw.githubusercontent.com/explooosion/winnie-greet-actions/master/assets/${random}.png`
}

module.exports.getEventPath = () => {
  console.log(process.env.NODE_ENV)
  return process.env.NODE_ENV === 'test'
    ? '.' + process.env.GITHUB_EVENT_PATH
    : '..' + process.env.GITHUB_EVENT_PATH
}