const path = require("path");

module.exports = {
  template: "src/common/index.html",
  showCode: true,
  showUsage: true,
  skipComponentsWithoutExample: true,
  styleguideComponents: {
    Wrapper: path.join(__dirname, "src/common/Provider")
  }
};
