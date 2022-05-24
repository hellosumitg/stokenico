const SToken = artifacts.require('SToken');
const STokenSale = artifacts.require('STokenSale');

contract('SToken', () => {
    const initAmount = BigInt(750000 * 10**18);
    it('The contract was initialized with the appropriate values', () => {
        SToken.deployed().then((ST) => {
            STokenSale.deployed().then((STS) => {
                ST.transfer(STS.address, initAmount)
            });
        })
    });
});