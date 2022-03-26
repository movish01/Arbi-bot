//SPDX-License-Id6entifier: unlicensed
pragma solidity ^0.8.4;
import "./FlashLoanReceiverBase.sol";
import "./ILendingPoolAddressProvider.sol";
import "./ILendingPool.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "./TestUniswap.sol";
import "./TestSushiswap.sol";

contract FlashloanV1 is FlashLoanReceiverBaseV1 {
    using SafeMath for uint256;

    TestUniswap tu;
    TestSushiswap ts;
    DaiToken daitoken;

    address WBTC_WHALE = 0xF04a5cC80B1E94C69B48f5ee68a08CD2F09A7c3E;
    address DAI = 0x6B175474E89094C44Da98b954EedeAC495271d0F;
    address WBTC = 0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2;
    uint256 AMOUNT_IN = 1000000000000000000;
    uint256 AMOUNT_OUT_MIN = 0;

    // function FlashLoan(address _t) public  {
    //     tu = TestUniswap(_t);
    // }

    constructor(address _addressProvider) FlashLoanReceiverBaseV1(_addressProvider) public{
        daitoken = DaiToken(0x6B175474E89094C44Da98b954EedeAC495271d0F);
    }

 /**
        Flash loan 1000000000000000000 wei (1 ether) worth of `_asset`
     */

    

 function flashloan(address _asset, address _caller) public onlyOwner {
        bytes memory data = "";
        uint amount = 1 ether;

        ILendingPoolV1 lendingPool = ILendingPoolV1(addressesProvider.getLendingPool());
        lendingPool.flashLoan(address(this), _asset, amount, data);
    }

    /**
  This function is called after your contract has received the flash loaned amount
     */
     function executeOperation(
        address _reserve,
        uint256 _amount,
        uint256 _fee,
        bytes calldata _params
        )
    
        external 
        override 
    {
        require(_amount <= getBalanceInternal(address(this), _reserve), "Invalid balance, was the flashLoan successful?");
       //
        // Your logic goes here.
        // !! Ensure that *this contract* has enough of `_reserve` funds to payback the `_fee` !!
        //
       tu.swap(
WBTC, DAI, AMOUNT_IN, AMOUNT_OUT_MIN, WBTC_WHALE
       );
       uint balance = daitoken.balanceOf(WBTC_WHALE);
       ts.swap(
DAI, WBTC, balance, AMOUNT_OUT_MIN, WBTC_WHALE
       );

        uint totalDebt = _amount.add(_fee);
        transferFundsBackToPoolInternal(_reserve, totalDebt);
    }
}