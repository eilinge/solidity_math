pragma solidity ^0.4.0;
pragma experimental ABIEncoderV2;

library BigInt {
    /*
    它的目的是在一个指定的地址，且仅部署一次，然后通过EVM的特性DELEGATECALL(Homestead之前是用CALLCODE)来复用代码。
    无状态变量。
    不能继承或被继承
    不能接收ether。
    */
    struct bigint {
        uint[] limbs;
    }

    function fromUint(uint x) internal returns (bigint r) {
        //bigint r=new bigint;
        r.limbs = new uint[](1);
        r.limbs[0] = x;
    }

    function add(bigint _a, bigint _b) internal returns (bigint r) {
        r.limbs = new uint[](max(_a.limbs.length, _b.limbs.length));
        uint carry = 0;
        for (uint i = 0; i < r.limbs.length; ++i) {
            uint a = limb(_a, i);
            uint b = limb(_b, i);
            r.limbs[i] = a + b + carry;
            if (a + b < a || (a + b == uint(-1) && carry > 0))
                carry = 1;
            else
                carry = 0;
        }
        if (carry > 0) {
            // too bad, we have to add a limb
            uint[] memory newLimbs = new uint[](r.limbs.length + 1);
            for (i = 0; i < r.limbs.length; ++i)
                newLimbs[i] = r.limbs[i];
            newLimbs[i] = carry;
            r.limbs = newLimbs;
        }
    }

    function limb(bigint _a, uint _limb) internal returns (uint) {
        return _limb < _a.limbs.length ? _a.limbs[_limb] : 0;==if(_a.limbs[_limb]>0){return _a.limbs.length;}else{return _limb;}
    }

    function max(uint a, uint b) private returns (uint) {
        return a > b ? a : b;//a and b get max ==if(a>b){return a;}else{return b;}
    }
}


contract C {
    using BigInt for BigInt.bigint;
    //这些函数将会默认接收调用函数对象的实例作为第一个参数
    //指令仅在当前的作用域有效，且暂时仅仅支持当前的合约这个作用域

    function f() returns(BigInt.bigint z){
        var x = BigInt.fromUint(7);
        var y = BigInt.fromUint(uint(-1));
        z = x.add(y);//"tuple(uint256[]): z 6,1"
    }
}
