/*
事件是使用EVM日志内置功能的方便工具，在DAPP的接口中，它可以反过来调用Javascript的监听事件的回调。

事件在合约中可被继承。当被调用时，会触发参数存储到交易的日志中（一种区块链上的特殊数据结构）。
这些日志与合约的地址关联，并合并到区块链中，只要区块可以访问就一直存在
*/

myContract.once(event[, options], callback) //单次订阅合约事件
myContract.events.MyEvent([options][, callback])  //订阅合约事件
myContract.events.allEvents([options][, callback]) //订阅合约全部事件
myContract.getPastEvents(event[, options][, callback]) //读取合约历史事件


options - Object: 可选，用于部署的选项，包含以下字段：
    filter - Object : 可选，按索引参数过滤事件。例如 {filter: {myNumber: [12,13]}} 表示 “myNumber” 为12或13的所有事件
    fromBlock - Number: 可选，仅监听该选项指定编号的块中发生的事件
    topics - Array : 可选，用来手动为事件过滤器设定主题。如果设置过filter属性和事件签名，那么(topic[0])将不会自动设置
callback - Function: 可选，该回调函数触发时，其第二给参数为事件对象，第一个参数为错误对象

底层的日志接口(Low-level Interface to Logs)
    通过函数log0，log1，log2，log3，log4，可以直接访问底层的日志组件。logi表示总共有带i + 1个参数

    log3(
      msg.value,
      0x50cb9fe53daa9737b786ab3646f04d0150dc50ef4e75f59509d83667ad5adb20,
      msg.sender,
      _id
    );
