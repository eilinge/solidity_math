pragma solidity ^0.4.21;
pragma experimental ABIEncoderV2;

contract Vote{
    //候选人 candidate
    //["eilinge","lin","ailin"]

    //0x14723a09acff6d2a60dcdf7aa4aff308fddc160c 1
    //0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db 1
    //0x583031d1113ad414f02576bd6afabfb302140225 1
    //0xdd870fa1b7c4700f2bd7f44238821c26f7392148 1

    struct Candidate{
        string _name;
        uint _mount;
    }
    //投票人 voter
    struct Voter{
        uint _voterAddr;
        uint _weight;
        bool _isVoted;
        address _agent;
    }
    //主席 adim
    address public admin;

    //mapping(uint =>Candidate)public Candidates;
    Candidate[] public Candidates;

    mapping(address=>Voter) public Voters;

    constructor(string[] canNames) public {
        admin = msg.sender;
        for (uint i;i<canNames.length;i++){
            //Candidates[i]._name=canNames[i];
            //Candidates[i]._mount = 0;
            Candidate memory can= Candidate(canNames[i],0);
            Candidates.push(can);
        }
    }

    modifier OnlyAdmin() {
        require(admin==msg.sender);
        _;
    }
    //给予投票权
    function GiveRightTo(address add) OnlyAdmin() public{
        Voter storage vot = Voters[add];
        require(vot._weight <=0 && vot._isVoted==false);

        //vot._isVoted = true;
        vot._weight =1;
    }
    //投票
    function vaoterRight(uint num) public{
        Voter storage vot1 = Voters[msg.sender];
        require(vot1._weight >0 && vot1._isVoted==false);
        vot1._isVoted = true;

        Candidates[num]._mount += vot1._weight;

    }

    //代理人投票 agent
    function setAgent(address age) public{
        Voter storage vot2 = Voters[msg.sender];
        require(vot2._weight >0 && vot2._isVoted==false);

        while(vot2._agent != address(0) &&vot2._agent !=msg.sender){
            age = Voters[age]._agent;
        }
        vot2._isVoted =true;
        require(age !=msg.sender);

        Voter storage finalAgent = Voters[age];

        if(finalAgent._isVoted){
            Candidates[finalAgent._voterAddr]._mount += vot2._weight;
        }else{
            finalAgent._weight += vot2._weight;
        }

    }
    //查看票数 counts
    function CheckCounts() view public returns(uint){
        string Winner;
        uint WinCount;

        for (uint i;i<Candidates.length;i++){
            if(Candidates[i]._mount > WinCount){
                WinCount = Candidates[i]._mount;
                Winner = Candidates[i]._name;
            }
        }
        return (WinCount);
    }
}
