interface DaiToken {
    function transfer(address dst, uint wad) external returns (bool);
    function balanceOf(address guy) external view returns (uint);
}