// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
const hre = require("hardhat");

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  [owner, addr1, addr2, addr3, addr4, ...addrs] = await ethers.getSigners();


  const Donor = await hre.ethers.getContractFactory("Donor");
  const donor = await Donor.deploy();
  await donor.deployed();


  const GoDonor = await hre.ethers.getContractFactory("Godonor");
  const godonor = await GoDonor.deploy(donor.address);
  await godonor.deployed();

  let tx = await godonor.startFundMe(100, 1);
  let tx2 = await godonor.connect(addr1).startFundMe(1003, 2);
  let tx3 = await godonor.connect(addr2).startFundMe(1002, 12);
  let tx4 = await godonor.connect(addr3).startFundMe(10011, 111);
  let tx5 = await godonor.connect(addr4).startFundMe(1005, 13);
  console.log(tx);
  console.log(tx2);
  console.log(tx3);
  console.log(tx4);
  console.log(tx5);



  console.log("GoDonor deployed to:", godonor.address);
  console.log("Donor deployed to: ", donor.address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
