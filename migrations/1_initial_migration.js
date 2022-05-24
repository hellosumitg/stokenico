const SToken = artifacts.require("./stokenico/SToken");
const STokenSale = artifacts.require("./stokenico/STokenSale");

module.exports = function (deployer) {
  deployer.deploy(SToken).then(() => {
    return deployer.deploy(STokenSale, SToken.address);
  });
};