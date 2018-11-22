//var Web3 = require('./../web3/lib/web3');
var Web3 = require('./../web3');
var fs = require('fs')

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:9545'));

var abi = JSON.parse(fs.readFileSync('math_sol_Math.abi'));

//var address = '0xf12b5dd4ead5f743c6baa640b0216200e89b60da';

var address = '0x345ca3e014aaf5dca488057592ee47305d9b3e10';

var contract = web3.eth.contract(abi);

var instance = contract.at(address);

console.log(instance.AddFunc.call(10,20));

console.log(instance.AddFunc(10,20,{from:web3.eth.accounts[0]}));
