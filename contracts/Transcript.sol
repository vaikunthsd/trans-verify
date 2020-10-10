pragma solidity ^0.5.0;

contract Transcript {
  mapping(bytes32 => bool) private records; 
  address public admin;

  constructor() public {
    admin = msg.sender;
  }

  /**
   * @dev admin can add student record (hash of transcript)
   **/
  function addRecord(
    string calldata _transcript) 
    external 
    onlyAdmin() {
    records[keccak256(abi.encodePacked(_transcript))] = true;
  }

  /**
   * @dev verify that a transcript was authentified for a student by admin 
   **/
  function verifyRecord(
    string calldata _transcript) 
    external
    view
    returns(bool) {
    return records[keccak256(abi.encodePacked(_transcript))] == true;
  }

  modifier onlyAdmin() {
    require(msg.sender == admin, 'only admin');
    _;
  }
}
