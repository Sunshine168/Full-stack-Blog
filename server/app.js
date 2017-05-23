require('./index');
require("babel-core").transform("code", {
  plugins: ["transform-decorators"]
});
