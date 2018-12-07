pragma solidity ^0.4.10;
pragma experimental ABIEncoderV2;


contract Vote{

    //["eilinge","lin","duzi"]

    //admin:0xca35b7d915458ef540ade6068dfe2f44e8fa733c

    //0x14723a09acff6d2a60dcdf7aa4aff308fddc160c
    //0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db
    //0xdd870fa1b7c4700f2bd7f44238821c26f7392148

    //候选人
    struct candidate{
        string _candida;
        uint _count;
    }

    //投票人
    struct voter{
        uint _toCan;
        bool _isVoted;
        uint _Weight;
        address _agent;
    }
    //管理员
    address public Admin;

    candidate[] public Candidates;
    //候选人集合
    //mapping(uint=>candidate)public candidates;

    //投票人集合
    mapping(address=>voter) public Voters;

    constructor(string[] canName){
        Admin = msg.sender;
        for(uint i;i<canName.length;i++){
            Candidates.push(candidate(canName[i],0));
        }
    }
    modifier OnlyAdmin(){
        require(Admin==msg.sender);
        _;
    }
    //给予投票人投票权
    function GiveToRight(address addr) OnlyAdmin() public{
        voter storage vot = Voters[addr];
        require(vot._isVoted !=true && vot._Weight ==0);
        vot._Weight =1;
    }
    //设置代理人
    function setAgent(address addr) public{
        voter storage vot = Voters[msg.sender];
        require(vot._isVoted !=true && vot._Weight>0);
        vot._isVoted = true;

        while(Voters[addr]._agent !=address(0) && Voters[addr]._agent !=msg.sender){
            addr = Voters[addr]._agent;
        }
        if(Voters[addr]._isVoted){
            Candidates[Voters[addr]._toCan]._count += vot._Weight;
        }else{
            Voters[addr]._Weight += vot._Weight;
        }
    }
    //投票
    function voterTo(uint num) public{
        voter storage vot = Voters[msg.sender];
        require(vot._isVoted !=true && vot._Weight>0);
        vot._isVoted = true;
        Candidates[num]._count += vot._Weight;
    }
    //比较谁票数多

    function CheckResult()public returns(uint,string){
        string storage whoWinner;
        uint winCount;

        for(uint i;i<Candidates.length;i++){
            if(Candidates[i]._count>winCount){
                winCount =Candidates[i]._count;

                whoWinner =Candidates[i]._candida;
            }
            return (winCount,whoWinner);
        }

    }
}
