var Web3 = require('web3');
var fs = require('fs');
//var web3 = new Web3(new Web3.providers.IpcProvider("\\\\.\\pipe\\geth.ipc",net));
var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"));
var eth=web3.eth;


var MyTokenABI = JSON.parse(fs.readFileSync("eve_sol_MyToken.abi"));
var addr = '0x2C2B9C9a4a25e24B174f26114e8926a9f2128FE4';

var tokenContract = new web3.eth.Contract(MyTokenABI, addr);

//合约部署成功以后,有了地址就可以根据地址来查询合约的状态
tokenContract.methods.name().call(null,function(error,result){
        console.log("contract name "+result);//'token on web3'
    })

    //查询合约状态并不需要发起事务,也不需要花费gas
tokenContract.methods.balanceOf("0xf17f52151ebef6c7334fad080c5704d77216b732").call(null,function(error,result){
        console.log("balanceOf "+result);//387
    })
//调用合约函数:合约的函数除了指明返回值是constant的以外,都需要发起事务,这时候就需要指定调用者,因为要花费该账户的gas.
//查询合约状态并不需要发起事务,也不需要花费gas
tokenContract.methods.transfer("0xf17f52151ebef6c7334fad080c5704d77216b732",387).send({from: '0x627306090abab3a6e1400e9345bc60c78a8bef57'})
.on('transactionHash', function(hash){})
.on('confirmation', function(confirmationNumber, receipt){})
.on('receipt', function(receipt){
    // receipt example
    console.log(receipt); //查询这里可以得到结果
})
.on('error', console.error); // If a out of gas error, the second parameter is the receipt.


//刚刚调用transfer的时候还会触发合约的事件Transfer,如果程序关注谁给谁进行了转账,那么就可以通过监听该事件.
/*tokenContract.events.Transfer({
    fromBlock: 0,
    toBlock:'latest'
},function(error, event){
})
.on('data', function(event){ //Object: 接收到新的事件时触发，参数为事件对象
    console.log(event); // same results as the optional callback above
})
.on('changed', function(event){//Object: 当事件从区块链上移除时触发，该事件对象将被添加额外的属性"removed: true"
    // remove event from local database
})
.on('error', console.error);//Object: 当发生错误时触发
*/
/*
{ transactionHash: '0xb2aff2ac2e95c5f47ca8dc3d97104f0f65346a2c80f5b2dfaa40241276d4110a',
  transactionIndex: 0,
  blockHash: '0x405ce50ab7d02620ae2a61579976ebe5a1a466a13cc03ef857324ac66983ab91',
  blockNumber: 13,
  gasUsed: 36680,
  cumulativeGasUsed: 36680,
  contractAddress: null,
  status: true,
  logsBloom: '0x00000000000000000000000000000000000000000004000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000008000000010000008000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000010000000001000000000010000000000000000000000000000000000000000010000000002000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  events:
   { Transfer:
      { logIndex: 0,//Number: 事件在块中的索引位置
        transactionIndex: 0,//Number: 事件在交易中的索引位置
        transactionHash: '0xb2aff2ac2e95c5f47ca8dc3d97104f0f65346a2c80f5b2dfaa40241276d4110a',//32 Bytes - String: 事件所在交易的哈希值
        blockHash: '0x405ce50ab7d02620ae2a61579976ebe5a1a466a13cc03ef857324ac66983ab91',//32 Bytes - String: 事件所在块的哈希值，pending的块该值为 null
        blockNumber: 13,//Number: 事件所在块的编号，pending的块该值为null
        address: '0x2C2B9C9a4a25e24B174f26114e8926a9f2128FE4',//String: 事件源地址
        type: 'mined',
        id: 'log_3f0fc629',
        returnValues: [Object],//Object: 事件返回值，例如 {myVar: 1, myVar2: '0x234...'}.
        event: 'Transfer',//String: 事件名称
        signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',//String|Null: 事件签名，如果是匿名事件，则为null
        raw: [Object] } } }
*/

tokenContract.methods.transferFrom('0x627306090abab3a6e1400e9345bc60c78a8bef57',"0xf17f52151ebef6c7334fad080c5704d77216b732",20).send({from: '0x627306090abab3a6e1400e9345bc60c78a8bef57'})
.on('transactionHash', function(hash){})
.on('confirmation', function(confirmationNumber, receipt){})
.on('receipt', function(receipt){
    // receipt example
    console.log(receipt); //查询这里可以得到结果
})
.on('error', console.error);

tokenContract.events.Transfer({
    //fromBlock: 0,
    toBlock:'latest'
},function(error, event){
})
.on('data', function(event){
    console.log(event); // same results as the optional callback above
})
.on('changed', function(event){
    // remove event from local database
})
.on('error', console.error);

/*
Error: Returned error: VM Exception while processing transaction: revert
    at Object.ErrorResponse (C:\Users\wuchan4x\node_modules\web3-core-helpers\src\errors.js:29:16)
    at C:\Users\wuchan4x\node_modules\web3-core-requestmanager\src\index.js:140:36
    at XMLHttpRequest.request.onreadystatechange (C:\Users\wuchan4x\node_modules\web3-providers-http\src\index.js:91:13)
    at XMLHttpRequestEventTarget.dispatchEvent (C:\Users\wuchan4x\node_modules\xhr2-cookies\dist\xml-http-request-event-target.js:34:22)
    at XMLHttpRequest._setReadyState (C:\Users\wuchan4x\node_modules\xhr2-cookies\dist\xml-http-request.js:208:14)
    at XMLHttpRequest._onHttpResponseEnd (C:\Users\wuchan4x\node_modules\xhr2-cookies\dist\xml-http-request.js:318:14)
    at IncomingMessage.<anonymous> (C:\Users\wuchan4x\node_modules\xhr2-cookies\dist\xml-http-request.js:289:61)
    at emitNone (events.js:111:20)
    at IncomingMessage.emit (events.js:208:7)
    at endReadableNT (_stream_readable.js:1064:12)
    at _combinedTickCallback (internal/process/next_tick.js:139:11)
    at process._tickCallback (internal/process/next_tick.js:181:9)
{ transactionHash: '0xe0e37531928e2b0e5592f954dfe6ae8293f28e322d41256b2b64dd80082c93f7',
  transactionIndex: 0,
  blockHash: '0x11b3511ed5269a601af864c74e4946edb56b7ef1f9331868cedf85b7c84cb59e',
  blockNumber: 14,
  gasUsed: 36680,
  cumulativeGasUsed: 36680,
  contractAddress: null,
  status: true,
  logsBloom: '0x00000000000000000000000000000000000000000004000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000008000000010000008000000000000000000000000000080000000000000000000000000000000000000000000000000000000000000000010000000001000000000010000000000000000000000000000000000000000010000000002000000000000000000000000000000000000000000000000000000000000000000000002000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
  events:
   { Transfer:
      { logIndex: 0,
        transactionIndex: 0,
        transactionHash: '0xe0e37531928e2b0e5592f954dfe6ae8293f28e322d41256b2b64dd80082c93f7',
        blockHash: '0x11b3511ed5269a601af864c74e4946edb56b7ef1f9331868cedf85b7c84cb59e',
        blockNumber: 14,
        address: '0x2C2B9C9a4a25e24B174f26114e8926a9f2128FE4',
        type: 'mined',
        id: 'log_0f1d28ae',
        returnValues: [Object],
        event: 'Transfer',
        signature: '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        raw: [Object] } } }
*/
