// const MockDaiArtifact = require("../build/contracts/MockDharmaDai.json");
// const MockPegArtifact = require("../build/contracts/MockDharmaPeg.json");
// const { compileBaseMock } = require("../app/lib");
// const { deploy } = require("./utils/web3");

// async function getContract(web3, artifact, networkID) {
//   const { address } = artifact.networks[networkID];
//   return new web3.eth.Contract(artifact.abi, address);
// }

// const contracts = await compileBaseMock();
// const dai = await deploy(
//   tester.web3,
//   tester.from,
//   { contracts, name: "MockDharmaDai" },
//   [5000, "Dharma Dai", "DDAI"]
// );
// const peg = await deploy(
//   tester.web3,
//   tester.from,
//   { contracts, name: "MockDharmaPeg" },
//   [dai.options.address]
// );

async function getContractsFromExternalHost() {
  const MockDharmaDai = artifacts.require("MockDharmaDai");
  const MockDharmaPeg = artifacts.require("MockDharmaPeg");
  const dai = await MockDharmaDai.deployed();
  const peg = await MockDharmaPeg.deployed(dai.address);
  return {
    dai: dai.contract,
    peg: peg.contract
  };
}

function deployFromArtifact(tester, artifact, args) {
  const { abi, bytecode } = artifact;
  return new tester.web3.eth.Contract(abi)
    .deploy({ data: bytecode, arguments: args || [] })
    .send({
      from: tester.from,
      gas: 6e6
    });
}

async function deployContracts(tester) {
  const MockDaiArtifact = require("../build/contracts/MockDharmaDai.json");
  const MockPegArtifact = require("../build/contracts/MockDharmaPeg.json");
  const dai = await deployFromArtifact(tester, MockDaiArtifact, [
    5000,
    "DharmaDai",
    "DDAI"
  ]);
  const peg = await deployFromArtifact(tester, MockPegArtifact, [
    dai.options.address
  ]);
  return { dai, peg };
}

module.exports = {
  getContractsFromExternalHost,
  deployContracts
};
