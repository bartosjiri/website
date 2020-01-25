const autoprefixer = require("autoprefixer");

module.exports = {
  plugins: [
    autoprefixer({
      browsersList: ">0.2%"
    })
  ]
};