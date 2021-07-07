pragma solidity ^0.4.10;

contract funder{

    //0x14723a09acff6d2a60dcdf7aa4aff308fddc160c,10
    //0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db,20
    //捐款人
    struct Funder{
        address _fun;
        uint _mou;
    }
    //集资人
    struct campery{
        address _denefiry;
        uint _goal;
        uint _count;
        uint _mount;
        mapping(uint=>Funder) Funders;
    }
    //集资人集合
    /*
    mapping(uint=>campery) public Campery;

    uint camperyid;
    //实例化集资人
    function setCampery(address addr,uint goal) public{
        Campery[camperyid]=campery(addr,goal,0,0);
        camperyid++;
    }
    */
    campery[] public Campery;

    event InstanceCampery(address add,uint goa);

    uint camperyid;
    //实例化集资人
    function setCampery(address addr,uint goal) public{
        Campery.push(campery(addr,goal,0,0));
        emit InstanceCampery(addr,goal);
        //camperyid++;
    }

    //捐赠
    function camperies(uint num) payable public{
        campery storage cam=Campery[num];
        require(msg.sender.balance>msg.value);
        cam.Funders[cam._count++] = Funder(msg.sender,msg.value);

        cam._mount += msg.value;
        cam._denefiry.transfer(msg.value);
    }

    //查看是否达标
    function checkGoal(uint num1) public returns(bool success){
        campery storage cam=Campery[num1];
        if(cam._goal <= cam._mount){
            return true;
        }else{
            return false;
        }
    }

}
