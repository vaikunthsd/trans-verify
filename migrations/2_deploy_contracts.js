const Transcript = artifacts.require("Transcript");

module.exports = async function(deployer) {
  deployer.deploy(Transcript);
  const transcript = await Transcript.deployed();
  //await transcript.addRecord('{"Algorithms": "B", "Network Security": "A"}');
};
