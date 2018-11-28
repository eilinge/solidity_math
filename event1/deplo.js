调用：
    myContract.deploy(options)
参数：
options - Object: 用于部署的配置选项，包含以下字段：
    data - String: 合约的字节码
    arguments - Array : 可选，在部署时将传入合约的构造函数
返回值：
Object: 交易对象，包含以下字段：
    arguments: Array - 之前传入方法的参数，可修改
    send: Function - 用来部署合约，其返回的promise对象将解析为新的合约实例，而非交易收据！
    estimateGas: Function - 用来估算用于部署的gas用量
    encodeABI: Function - 用来编码部署的ABI数据，即合约数据 + 构造函数参数

myContract.deploy({
    data: '0x12345...',
    arguments: [123, 'My String']
})
.send({
    from: '0x1234567890123456789012345678901234567891',
    gas: 1500000,
    gasPrice: '30000000000000'
}, function(error, transactionHash){ ... })
.on('error', function(error){ ... })
.on('transactionHash', function(transactionHash){ ... })
.on('receipt', function(receipt){
   console.log(receipt.contractAddress) // 收据中包含了新的合约地址
})
.on('confirmation', function(confirmationNumber, receipt){ ... })
.then(function(newContractInstance){
    console.log(newContractInstance.options.address) // 新地址的合约实例
});

// data是合约自身的一个可选配置项
myContract.options.data = '0x12345...';

myContract.deploy({
    arguments: [123, 'My String']
})
.send({
    from: '0x1234567890123456789012345678901234567891',
    gas: 1500000,
    gasPrice: '30000000000000'
})
.then(function(newContractInstance){
    console.log(newContractInstance.options.address) // instance with the new contract address
});

// 编码
myContract.deploy({
    data: '0x12345...',
    arguments: [123, 'My String']
})
.encodeABI();
> '0x12345...0000012345678765432'

// 估算gas
myContract.deploy({
    data: '0x12345...',
    arguments: [123, 'My String']
})
.estimateGas(function(err, gas){
    console.log(gas);
});
