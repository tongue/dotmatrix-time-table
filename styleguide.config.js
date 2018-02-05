const path = require("path");

module.exports = {
  template: "src/common/index.html",
  showCode: true,
  showUsage: true,
  skipComponentsWithoutExample: true,
  components: "src/components/**/index.{js,jsx,ts,tsx}",
  styleguideComponents: {
    Wrapper: path.join(__dirname, "src/common/Provider")
  }
};
