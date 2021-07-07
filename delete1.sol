pragma solidity ^0.4.10;

contract Delete{
    /*
        delete可用于任何变量(除mapping),将其设置成默认值
        bytes/string:删除所有元素,其长度变为0
        bytes32:重置所有索引的值
        mapping:什么都不会发生
        mapping(key=>value)中的key:删除与该键相关的值
    */
    string public str1 ='nihao';

    function deletstr() public{
        delete str1;
    }
    function setstr() public returns(string){
        return str1='NIHAO';
    }

    uint[5] public b1=[uint(10),2,3,4,5];

    uint[] public b2=new uint[](10);

    function initAccary() public{
        for(uint i;i<10;i++){
            b2[i] = i;
        }
    }

    function deleStaticAccary() public{
        delete b1;
    }
    function deleDhcpAccary() public{
        delete b2;
    }
    function getlength() public view returns(uint,uint){
        return (b1.length,b2.length);
    }

    mapping(uint=>bool) public m1;

    function f1() public{
        m1[1]=true;
        m1[2]=false;
    }

    function deleM(uint a) public{
        delete m1[a];
    }

    struct Person{
        string name;
        mapping(string =>uint) NameSore;
    }

    //Person p2=Person('duke',(['duke'][90]));
    Person public p1;
    function InitP1() public{
        p1.name='duke';
        p1.NameSore['duke']=90;
    }

    function checkP1() public view returns(string,uint){
        return(p1.name,p1.NameSore['duke']);
    }
    function delP1() public{
        delete p1;
    }
}
