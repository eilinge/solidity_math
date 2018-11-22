//var Web3 = require('./../web3/lib/web3');
var Web3 = require('./../web3');
var fs = require('fs')

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));

/*
var abi = JSON.parse(fs.readFileSync('math_sol_Math.abi'));
var bytecode = fs.readFileSync('math_sol_Math.bin');
var contract = web3.eth.contract(abi);

var deploy = contract.new({data:bytecode ,from:web3.eth.accounts[0],gas:1000000},
    function(error,result){
      if(!error){
        console.log(result.address);
      }else{
        console.log(error);
      }
    }
)
*/
var mathContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"a","type":"uint256"},{"name":"d","type":"uint256"}],"name":"AddFunc","outputs":[{"name":"","type":"uint256"}],"payable":false,"stateMutability":"nonpayable","type":"function"}]);
var math = mathContract.new(
   {
     from: web3.eth.accounts[0],
     data: '0x608060405234801561001057600080fd5b5060c58061001f6000396000f300608060405260043610603f576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff168063fa06464c146044575b600080fd5b348015604f57600080fd5b5060766004803603810190808035906020019092919080359060200190929190505050608c565b6040518082815260200191505060405180910390f35b60008183019050929150505600a165627a7a723058209e30a4d041768ec80618264fab800d510c4a90c5356b3fb4b6d9c21417c3c7280029',
     gas: '4700000'
   }, function (e, contract){
    console.log(e, contract);
    if (typeof contract.address !== 'undefined') {
         console.log('Contract mined! address: ' + contract.address + ' transactionHash: ' + contract.transactionHash);
    }
 })
