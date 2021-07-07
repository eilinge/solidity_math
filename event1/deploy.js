var Web3 = require('web3');
var fs = require('fs');
//var web3 = new Web3(new Web3.providers.IpcProvider("\\\\.\\pipe\\geth.ipc",net));
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
var eth=web3.eth;

/*
(0) 0x627306090abab3a6e1400e9345bc60c78a8bef57
(1) 0xf17f52151ebef6c7334fad080c5704d77216b732
(2) 0xc5fdf4076b8f3a5357c5e395ab970b5b54098fef
(3) 0x821aea9a577a9b44299b9c15c88cf3087f3b5544
(4) 0x0d1d4e623d10f9fba5db95830f7d3839406c6af2
(5) 0x2932b7a2355d6fecc4b5c0b6bd44cc31df247a2e
(6) 0x2191ef87e392377ec08e7c08eb105ef5448eced5
(7) 0x0f4f2ac550a1b4e2280d04c21cea7ebd822934b5
(8) 0x6330a553fc93768f612722bb8c2ec78ac90b3bbc
(9) 0x5aeda56215b167893e80b4fe645ba6d5bab767de
*/
var abi = JSON.parse(fs.readFileSync("eve_sol_MyToken.abi"));
var bytecode = fs.readFileSync('eve_sol_MyToken.bin');

var tokenContract = new web3.eth.Contract(abi, null, {
    from: '0xf17f52151ebef6c7334fad080c5704d77216b732' // 目前web3没有api来解锁账户,只能自己事先解锁
});
/*
new web3.eth.Contract(jsonInterface[, address][, options])
参数：

jsonInterface(abi) - Object: 要实例化的合约的json接口
address - String: 可选，要调用的合约的地址，也可以在之后使用 myContract.options.address = '0x1234..' 来指定该地址
options - Object : 可选，合约的配置对象，其中某些字段用作调用和交易的回调：
    from - String: 交易发送方地址
    gasPrice - String: 用于交易的gas价格，单位：wei
    gas - Number: 交易可用的最大gas量，即gas limit
    data - String: 合约的字节码，部署合约时需要
*/

/*
truffle(develop)> tokenContract.options
    { address: [Getter/Setter], jsonInterface: [Getter/Setter] }
truffle(develop)> tokenContract.options.jsonInterface[1]
    { constant: false,
      inputs:
       [ { name: '_from', type: 'address' },
         { name: '_to', type: 'address' },
         { name: '_value', type: 'uint256' } ],
      name: 'transferFrom',
      outputs: [ { name: '', type: 'bool' } ],
      payable: false,
      stateMutability: 'nonpayable',
      type: 'function',
      signature: '0x23b872dd' }
*/
tokenContract.deploy({
    data: bytecode,//bin
    arguments: [32222, 'token on web3',0,'web3']
}).send({
    from: '0xf17f52151ebef6c7334fad080c5704d77216b732',
    gas: 1500000,
    gasPrice: '30000000000000'
}, function(error, transactionHash){
    console.log("deploy tx hash:"+transactionHash)//0xfe4941511eb5155e94843900ff5b489c3b9beca5ac624e31e364637d2bb90bcd
})
.on('error', function(error){
    console.error(error) })
.on('transactionHash', function(transactionHash){
    console.log("hash:",transactionHash)})// 0xfe4941511eb5155e94843900ff5b489c3b9beca5ac624e31e364637d2bb90bcd
.on('receipt', function(receipt){
    console.log(receipt.contractAddress) // contains the new contract address
})
.on('confirmation', function(confirmationNumber, receipt){
    console.log("receipt,",receipt)})
    /*
    receipt, { transactionHash: '0xfe4941511eb5155e94843900ff5b489c3b9beca5ac624e31e364637d2bb90bcd',
      transactionIndex: 0,
      blockHash: '0x97efd68ca1245db9ef6899589e6a3b1b1e404bd08f5f7467896e9d2b4f03a4c0',
      blockNumber: 16,
      gasUsed: 1041001,
      cumulativeGasUsed: 1041001,
      contractAddress: '0x4D2D24899c0B115a1fce8637FCa610Fe02f1909e',
      status: true,
      logsBloom: '0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
      events: {} }
    */
.then(function(newContractInstance){
    console.log(newContractInstance.options.address) // '0x30753E4A8aad7F8597332E813735Def5dD395028'
});
