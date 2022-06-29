pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Donor.sol"; 

contract Godonor is Ownable {

   Donor public donor;
  // IDEXRouter public router;
  // address WBNB = 0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c;

   
   uint public id = 1;
   // tbd
   uint private taxPool;
   // Fee for Donor.
   uint private feeForPool;
   // Front End helper for tracking all current funds.
   uint public onGoingFunds;

   constructor(address payable _donor) {
       donor = Donor(_donor);
     //  router = IDEXRouter(0x10ED43C718714eb63d5aA57B78B54704E256024E);
       feeForPool = 10;
   }

    struct Receiver {
        uint id;
        uint amountRaised;
        uint targetAmount;
        uint startBlock;
        uint endBlock;
    }
    
    mapping(address => Receiver) public balanceRaised;
    mapping(uint => address) public owners;
    mapping(address => bool) public fundStarted; 

    function startFundMe(uint256 _amountToRaise, uint256 _daysToRaise) public {
        require(fundStarted[msg.sender] == false, "You are in a fund.");
        require(_daysToRaise >= 1, "Not enough time.");
        balanceRaised[msg.sender].id = id;
        owners[id] = msg.sender;
        balanceRaised[msg.sender].targetAmount = _amountToRaise;
        balanceRaised[msg.sender].startBlock = block.timestamp;
        balanceRaised[msg.sender].endBlock = block.timestamp + (86400 * _daysToRaise);
        fundStarted[msg.sender] = true;
        id ++;
        onGoingFunds ++;
    }

    // function donateAsBnb(address _to) payable public {
    //     require(block.timestamp < balanceRaised[_to].endBlock, "Fund is over.");

    //     uint256 balanceBefore = donor.balanceOf(address(this));

    //     address[] memory path = new address[](2);
    //     path[0] = WBNB;
    //     path[1] = address(donor);

    //     router.swapExactETHForTokensSupportingFeeOnTransferTokens{value: msg.value}(
    //         0,
    //         path,
    //         address(this),
    //         block.timestamp
    //     );

    //     uint256 amount = donor.balanceOf(address(this)) - balanceBefore;

    //     balanceRaised[_to].amountRaised += amount;
    // }

    function donateAsDonor(address _to, uint _amount) public {
        require(block.timestamp < balanceRaised[_to].endBlock, "Fund is over.");
        donor.transferFrom(msg.sender, address(this), _amount);
        balanceRaised[_to].amountRaised += _amount;
    }

    function disperseFunds() public {
        require(fundStarted[msg.sender] == true, "You are not in a fund.");
        require(block.timestamp > balanceRaised[msg.sender].endBlock || balanceRaised[msg.sender].targetAmount <= balanceRaised[msg.sender].amountRaised, "Still ongoing." );
        uint total = balanceRaised[msg.sender].amountRaised;
        uint feeAmount = total / feeForPool;
        uint giveAmount = total - feeAmount;
        balanceRaised[msg.sender].amountRaised = 0;
        fundStarted[msg.sender] = false;
        donor.transfer(owner(), feeAmount);
        donor.transfer(msg.sender, giveAmount);
        onGoingFunds --;
       
    }

    function getById(uint _id) public view returns(address) {
        return owners[_id];
    }

    function setFeePercent(uint _divisor) public onlyOwner {
        feeForPool = _divisor;
    }

    receive() external payable {}


}